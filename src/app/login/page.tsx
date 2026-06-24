"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { useStore } from "../../providers/StoreProvider";
import { CustomSelect } from "../../modules/checkout/components/CustomSelect";
import { PHONE_PREFIXES } from "../../modules/checkout/checkout.constants";

const normalizeAuthError = (message: string) => {
  const lower = message.toLowerCase();
  if (lower.includes("rate limit") || lower.includes("rate_limit")) {
    return "Too many confirmation emails were requested. Please wait a moment and try again.";
  }
  if (lower.includes("disabled") || lower.includes("sign up") || lower.includes("signup")) {
    return "New account registration is disabled in Supabase. Enable email signups before launching production.";
  }
  if (lower.includes("already registered") || lower.includes("user already")) {
    return "This email is already registered. Sign in instead or reset the password from Supabase Auth.";
  }
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "The email or password is incorrect.";
  }
  return message || "Something went wrong. Please try again.";
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const { profile, signOut } = useStore();

  useEffect(() => {
    if (profile) {
      router.push("/cuenta");
    }
  }, [profile, router]);
  const [register, setRegister] = useState(false);
  const [emailPrefill, setEmailPrefill] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+1");
  const [phone, setPhone] = useState("");

  const [savedCard, setSavedCard] = useState<any | null>(null);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", holder: "", expiry: "" });
  const [cardFormError, setCardFormError] = useState("");

  useEffect(() => {
    if (profile) {
      const stored = localStorage.getItem(`noma-saved-card-v1-${profile.id}`);
      if (stored) {
        try {
          setSavedCard(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing saved card", e);
        }
      }
    } else {
      setSavedCard(null);
    }
  }, [profile]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const clean = val.replace(/\D/g, "").slice(0, 16);
    const parts: string[] = [];
    for (let i = 0; i < clean.length; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    setCardForm((prev) => ({ ...prev, number: parts.join(" ") }));
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setCardForm((prev) => ({ ...prev, expiry: "" }));
      return;
    }
    const clean = val.replace(/\D/g, "");
    
    if (val.length < cardForm.expiry.length && cardForm.expiry.endsWith("/") && clean.length === 2) {
      setCardForm((prev) => ({ ...prev, expiry: clean.slice(0, 1) }));
      return;
    }

    if (clean.length > 2) {
      setCardForm((prev) => ({ ...prev, expiry: `${clean.slice(0, 2)}/${clean.slice(2, 4)}` }));
    } else if (clean.length === 2) {
      if (val.length < cardForm.expiry.length) {
        setCardForm((prev) => ({ ...prev, expiry: clean }));
      } else {
        setCardForm((prev) => ({ ...prev, expiry: `${clean}/` }));
      }
    } else {
      setCardForm((prev) => ({ ...prev, expiry: clean }));
    }
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCardFormError("");

    const cleanNum = cardForm.number.replace(/\D/g, "");
    if (cleanNum.length < 13 || cleanNum.length > 19) {
      setCardFormError("Please enter a valid credit card number.");
      return;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanNum.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNum.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    if (sum % 10 !== 0) {
      setCardFormError("The card number is invalid (failed checksum check).");
      return;
    }

    if (cardForm.holder.trim().split(/\s+/).length < 2) {
      setCardFormError("Please enter cardholder full name (first and last name).");
      return;
    }

    const expiryMatch = cardForm.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!expiryMatch) {
      setCardFormError("Expiry date must be in MM/YY format.");
      return;
    }
    const month = parseInt(expiryMatch[1], 10);
    const year = parseInt("20" + expiryMatch[2], 10);
    if (month < 1 || month > 12) {
      setCardFormError("Invalid expiration month (must be 01-12).");
      return;
    }
    const now = new Date();
    const expiryDate = new Date(year, month, 1);
    if (expiryDate <= now) {
      setCardFormError("The card has expired or expiration date is invalid.");
      return;
    }

    let brand = "Card";
    if (cleanNum.startsWith("4")) brand = "Visa";
    else if (/^5[1-5]/.test(cleanNum)) brand = "MasterCard";
    else if (/^3[47]/.test(cleanNum)) brand = "Amex";

    const cardData = {
      number: cleanNum,
      holder: cardForm.holder.toUpperCase(),
      expiry: cardForm.expiry,
      brand,
    };

    if (profile) {
      localStorage.setItem(`noma-saved-card-v1-${profile.id}`, JSON.stringify(cardData));
      setSavedCard(cardData);
      setIsEditingCard(false);
      setCardForm({ number: "", holder: "", expiry: "" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      const registerParam = params.get("register");
      if (emailParam) {
        setEmailPrefill(emailParam);
      }
      if (registerParam === "true") {
        setRegister(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    setError("");
    setSuccess("");
    setLoading(true);

    const form = new FormData(formElement);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const name = String(form.get("name") || "").trim();
    const confirmPassword = String(form.get("confirmPassword") || "");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      if (register) {
        if (!name || name.split(/\s+/).length < 2) {
          setError("Please enter your full first and last name (first and last name).");
          setLoading(false);
          return;
        }
        if (!phone || phone.replace(/\D/g, "").length < 10) {
          setError("Please enter a valid phone number (at least 10 digits).");
          setLoading(false);
          return;
        }
        if (password.length < 8) {
          setError("Use at least 8 characters for a password.");
          setLoading(false);
          return;
        }
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
          setError("Password must contain at least one letter and one number.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              phone: `${phonePrefix} ${phone}`,
              role: "customer",
              marketing_opt_in: form.get("marketing") === "on",
            },
          },
        });

        if (signUpError) {
          setError(normalizeAuthError(signUpError.message));
          setLoading(false);
          return;
        }

        setSuccess(
          "Account created. If email confirmation is enabled, check your inbox before signing in.",
        );
        setRegister(false);
        formElement.reset();
        setLoading(false);
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(normalizeAuthError(signInError.message));
        setLoading(false);
        return;
      }

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single();

      window.location.href = userProfile?.role === "admin" ? "/admin" : "/";
    } catch (e: any) {
      setError(normalizeAuthError(e.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <Link className="account-brand" href="/">
        NŌMA<span>living spaces</span>
      </Link>
      <section>
        <div className="account-art">
          <div>
            <small>Private client space</small>
            <h1>
              Your house,
              <br />
              <em>remembered.</em>
            </h1>
            <p>
              Save curated pieces, revisit orders, and keep checkout details ready
              for a calmer purchase flow.
            </p>
          </div>
        </div>

        <div className="account-panel">
          {profile ? (
            <div className="session-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "40px", textAlign: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Redirecting to your account dashboard...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <LockKeyhole />
              <div className="account-tabs" role="tablist" aria-label="Account mode">
                <button
                  type="button"
                  className={!register ? "active" : ""}
                  onClick={() => {
                    setRegister(false);
                    setError("");
                    setSuccess("");
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  className={register ? "active" : ""}
                  onClick={() => {
                    setRegister(true);
                    setError("");
                    setSuccess("");
                  }}
                >
                  Create account
                </button>
              </div>
              <small>{register ? "New NŌMA client" : "Welcome back"}</small>
              <h2>{register ? "Create your account" : "Sign in securely"}</h2>

              {register && (
                <label>
                  Full name
                  <input name="name" required placeholder="Avery Brooks" disabled={loading} />
                </label>
              )}

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  defaultValue={emailPrefill}
                  key={emailPrefill}
                  disabled={loading}
                />
              </label>

              {register && (
                <label>
                  Phone Number
                  <div className="phone-input-wrap">
                    <CustomSelect
                      value={phonePrefix}
                      onChange={setPhonePrefix}
                      options={PHONE_PREFIXES.map(p => ({ value: p.code, label: p.label }))}
                      disabled={loading}
                    />
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="555 000 0000"
                      disabled={loading}
                    />
                  </div>
                </label>
              )}

              <label>
                Password
                <div className="password">
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    required
                    minLength={register ? 8 : 6}
                    autoComplete={register ? "new-password" : "current-password"}
                    placeholder={register ? "At least 8 characters" : "Your password"}
                    disabled={loading}
                  />
                  <button type="button" onClick={() => setShow(!show)}>
                    <span className="sr-only">
                      {show ? "Hide password" : "Show password"}
                    </span>
                    {show ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </label>

              {register && (
                <>
                  <label>
                    Confirm password
                    <input
                      name="confirmPassword"
                      type={show ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      disabled={loading}
                    />
                  </label>
                  <label className="account-check">
                    <input name="marketing" type="checkbox" disabled={loading} />
                    <span>Send me collection notes and private launch access.</span>
                  </label>
                </>
              )}

              {error && <p className="form-error" role="alert">{error}</p>}
              {success && (
                <p className="form-success" role="status">
                  <CheckCircle2 /> {success}
                </p>
              )}

              <button className="account-submit" type="submit" disabled={loading}>
                {loading ? "Processing..." : register ? "Create account" : "Sign in"}
                <ArrowRight />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
