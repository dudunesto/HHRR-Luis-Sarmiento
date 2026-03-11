import { Link, useLocation } from "react-router-dom";

export default function BarraNavegacion() {
  const location = useLocation();

  const esActiva = (ruta) =>
    location.pathname === ruta ? "nav-link active fw-bold" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">📋 Control de Fichajes</span>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={esActiva("/")} to="/">Fichar</Link>
          </li>
          <li className="nav-item">
            <Link className={esActiva("/historial")} to="/historial">Historial</Link>
          </li>
          <li className="nav-item">
            <Link className={esActiva("/reportes")} to="/reportes">Reportes</Link>
          </li>
          <li className="nav-item">
            <Link className={esActiva("/admin")} to="/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}