import { useState } from "react";
import { loginAdmin } from "../../services/ApiService";

export default function PantallaLoginAdmin({ onLoginExitoso }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const accionLoginAdmin = async () => {
    if (!email || !password) {
      setError("Debes rellenar todos los campos");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const respuesta = await loginAdmin(email, password);
      onLoginExitoso(respuesta);
    } catch {
      setError("Credenciales incorrectas");
    }

    setCargando(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
        <h2 className="text-center mb-4">Panel Administrador</h2>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@empresa.com"
            disabled={cargando}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && accionLoginAdmin()}
            placeholder="••••••••"
            disabled={cargando}
          />
        </div>

        <button
          className="btn btn-dark w-100"
          onClick={accionLoginAdmin}
          disabled={cargando}
        >
          {cargando && <span className="spinner-border spinner-border-sm me-2" />}
          {cargando ? "Entrando..." : "Entrar"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}