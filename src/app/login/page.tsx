"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const supabase = createClient();
  const { profile, signOut } = useStore();
  const [register, setRegister] = useState(false);
  const [emailPrefill, setEmailPrefill] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
    setError("");
    setSuccess("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
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
              phone,
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
        e.currentTarget.reset();
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
            <div className="session-card">
              <ShieldCheck />
              <small>Signed in</small>
              <h2>Welcome, {profile.name || "NŌMA client"}</h2>
              <p>{profile.email}</p>
              <div className="session-actions">
                {profile.role === "admin" && <Link href="/admin">Open admin room</Link>}
                <Link href="/">Continue shopping</Link>
                <button type="button" onClick={signOut}>
                  <LogOut /> Sign out
                </button>
              </div>
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
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 555 0100"
                    disabled={loading}
                  />
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
