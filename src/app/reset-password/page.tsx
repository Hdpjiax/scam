"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

const normalizeAuthError = (message: string) => {
  const lower = message.toLowerCase();
  if (lower.includes("rate limit") || lower.includes("rate_limit")) {
    return "Too many requests. Please wait a moment and try again.";
  }
  return message || "Something went wrong. Please try again.";
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

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

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(normalizeAuthError(updateError.message));
        setLoading(false);
        return;
      }

      setSuccess("Your password has been successfully updated. Redirecting to home page...");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err: any) {
      setError(normalizeAuthError(err.message));
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <Link className="account-brand" href="/">
        NŌMA<span>living spaces</span>
      </Link>
      <section style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <div className="account-panel" style={{ margin: "40px auto", maxWidth: "450px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <LockKeyhole />
            <small>Reset Password</small>
            <h2>Create New Password</h2>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginBottom: "20px" }}>
              Please enter your new password below.
            </p>

            <label>
              New Password
              <div className="password">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <label>
              Confirm Password
              <input
                name="confirmPassword"
                type={show ? "text" : "password"}
                required
                minLength={8}
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}
            {success && (
              <p className="form-success" role="status">
                <CheckCircle2 /> {success}
              </p>
            )}

            <button className="account-submit" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
              <ArrowRight />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
