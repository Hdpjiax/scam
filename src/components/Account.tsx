import { useState } from "react";
import { useStore } from "../store";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
export default function Account() {
  const { users, setUsers, setUser } = useStore();
  const [register, setRegister] = useState(false),
    [show, setShow] = useState(false),
    [error, setError] = useState("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      email = String(d.get("email")).toLowerCase(),
      password = String(d.get("password"));
    if (register) {
      if (users.some((u) => u.email === email))
        return setError("Ya existe una cuenta con este correo.");
      const u = {
        id: String(Date.now()),
        name: String(d.get("name")),
        email,
        password,
        role: "customer" as const,
      };
      setUsers([...users, u]);
      setUser(u);
    } else {
      const u = users.find((u) => u.email === email && u.password === password);
      if (!u) return setError("Correo o contraseña incorrectos.");
      setUser(u);
    }
    location.hash =
      users.find((u) => u.email === email)?.role === "admin" ? "#/admin" : "#/";
  };
  return (
    <div className="account-page">
      <a className="account-brand" href="#/">
        NŌMA<span>casa viva</span>
      </a>
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
        <form onSubmit={submit}>
          <LockKeyhole />
          <small>{register ? "Únete a Nōma" : "Bienvenido de vuelta"}</small>
          <h2>{register ? "Crea tu cuenta" : "Inicia sesión"}</h2>
          {register && (
            <label>
              Nombre completo
              <input name="name" required placeholder="Tu nombre" />
            </label>
          )}
          <label>
            Correo electrónico
            <input
              name="email"
              type="email"
              required
              placeholder="nombre@email.com"
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
          <button className="account-submit">
            {register ? "Crear mi cuenta" : "Entrar"}
            <ArrowRight />
          </button>
          <p>
            {register ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
            <button
              type="button"
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
