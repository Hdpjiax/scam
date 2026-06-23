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
          setError(signUpError.message);
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
          setError("Correo o contraseña incorrectos.");
          setLoading(false);
          return;
        }

        // Obtener rol del perfil
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user?.id)
          .single();

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
            <small>Tu espacio Nōma</small>
            <h1>
              Una casa que
              <br />
              <em>te conoce.</em>
            </h1>
            <p>
              Guarda tus favoritos, consulta tus pedidos y recibe
              recomendaciones pensadas para ti.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <LockKeyhole />
          <small>{register ? "Únete a Nōma" : "Bienvenido de vuelta"}</small>
          <h2>{register ? "Crea tu cuenta" : "Inicia sesión"}</h2>
          {register && (
            <label>
              Nombre completo
              <input name="name" required placeholder="Tu nombre" disabled={loading} />
            </label>
          )}
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              required
              placeholder="nombre@email.com"
              disabled={loading}
            />
          </label>
          <label>
            Contraseña
            <div className="password">
              <input
                name="password"
                type={show ? "text" : "password"}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                disabled={loading}
              />
              <button type="button" onClick={() => setShow(!show)}>
                <span className="sr-only">
                  {show ? "Ocultar contraseña" : "Mostrar contraseña"}
                </span>
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="account-submit" type="submit" disabled={loading}>
            {loading ? "Procesando..." : register ? "Crear mi cuenta" : "Entrar"}
            <ArrowRight />
          </button>
          <p>
            {register ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setRegister(!register);
                setError("");
              }}
            >
              {register ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
          <div className="admin-hint">Demo admin: admin@noma.mx · admin123</div>
        </form>
      </section>
    </div>
  );
}
