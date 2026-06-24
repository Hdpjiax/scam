"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();
  const [register, setRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const d = new FormData(e.currentTarget);
    const email = String(d.get("email")).toLowerCase();
    const password = String(d.get("password"));
    const name = String(d.get("name") || "");

    try {
      if (register) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role: "customer",
            },
          },
        });

        if (signUpError) {
          const errMsg = signUpError.message.toLowerCase();
          if (errMsg.includes("rate limit") || errMsg.includes("rate_limit")) {
            setError(
              "Límite de correos de Supabase excedido. Puedes usar la cuenta de Demo Admin (admin@noma.mx / admin123) para iniciar sesión, o desactivar la opción 'Confirm email' en tu consola de Supabase (Auth -> Email -> Confirm email)."
            );
          } else if (errMsg.includes("disabled") || errMsg.includes("sign up") || errMsg.includes("signup")) {
            setError(
              "El registro de usuarios nuevos por correo está desactivado en tu Supabase. Ve a tu consola de Supabase (Auth -> Providers -> Email) y activa la opción 'Allow new users to sign up' / 'Enable signup'."
            );
          } else {
            setError(signUpError.message);
          }
          setLoading(false);
          return;
        }

        // Registro exitoso, redirigir o mostrar confirmación
        alert("Cuenta creada. Si la confirmación de correo está activada en Supabase, por favor verifica tu correo.");
        window.location.href = "/";
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError("email or password incorrect");
          setLoading(false);
          return;
        }

        // Obtener rol del perfil
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user?.id)
          .single();

        console.log("Login check:", { userId: data.user?.id, profile, profileError });

        if (profile?.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (e: any) {
      setError(e.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-page">
      <Link className="account-brand" href="/">
        NŌMA<span>casa viva</span>
      </Link>
      <section>
        <div className="account-art">
          <div>
            <small>Your Nōma space</small>
            <h1>
              One house
              <br />
              <em>knows you.</em>
            </h1>
            <p>
              Save your favorites, check your orders and receive
              recommendations designed for you.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <LockKeyhole />
          <small>{register ? "Join Nōma" : "Welcome back"}</small>
          <h2>{register ? "Create your account" : "Sign in"}</h2>
          {register && (
            <label>
              Full name
              <input name="name" required placeholder="Your name" disabled={loading} />
            </label>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="[EMAIL_ADDRESS]"
              disabled={loading}
            />
          </label>
          <label>
            Password
            <div className="password">
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
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
          {error && <p className="form-error">{error}</p>}
          <button className="account-submit" type="submit" disabled={loading}>
            {loading ? "Processing..." : register ? "Create my account" : "Sign in"}
            <ArrowRight />
          </button>
          <p>
            {register ? "Already have an account?" : "Don't have an account yet?"}{" "}
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setRegister(!register);
                setError("");
              }}
            >
              {register ? "Log in" : "Sign up"}
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}
