import { useState } from "react";
import PantallaLoginAdmin from "./PantallaLoginAdmin";
import PantallaAdminEmpleados from "./PantallaAdminEmpleados";
import PantallaAdminHorarios from "./PantallaAdminHorarios";
import PantallaAdminRegistros from "./PantallaAdminRegistros";
import PantallaAdminAlertas from "./PantallaAdminAlertas";

const MODULOS = {
  empleados: PantallaAdminEmpleados,
  horarios: PantallaAdminHorarios,
  registros: PantallaAdminRegistros,
  alertas: PantallaAdminAlertas,
};

export default function PantallaAdmin() {
  const [usuarioAdmin, setUsuarioAdmin] = useState(null);
  const [moduloActivo, setModuloActivo] = useState("empleados");

  if (!usuarioAdmin) {
    return <PantallaLoginAdmin onLoginExitoso={setUsuarioAdmin} />;
  }

  const ModuloActivo = MODULOS[moduloActivo];

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 bg-dark min-vh-100 p-3">
          <h5 className="text-white mb-4">Admin</h5>
          <ul className="nav flex-column">
            {Object.keys(MODULOS).map((modulo) => (
              <li key={modulo} className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${moduloActivo === modulo ? "btn-primary" : "btn-outline-light"}`}
                  onClick={() => setModuloActivo(modulo)}
                >
                  {modulo.charAt(0).toUpperCase() + modulo.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-danger w-100 mt-4"
            onClick={() => setUsuarioAdmin(null)}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Contenido */}
        <div className="col-md-10 p-4">
          <ModuloActivo />
        </div>

      </div>
    </div>
  );
}