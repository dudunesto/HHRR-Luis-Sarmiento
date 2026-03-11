import { useState, useEffect } from "react";
import { obtenerEmpleados, guardarEmpleado } from "../../services/ApiService";

const formularioVacio = {
  nombre: "",
  email: "",
  clave: "",
  activo: true,
};

export default function PantallaAdminEmpleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    setCargando(true);
    try {
      const respuesta = await obtenerEmpleados();
      setListaEmpleados(respuesta.empleados);
    } catch (err) {
      setError(err.message);
    }
    setCargando(false);
  };

  const abrirFormularioNuevo = () => {
    setFormulario(formularioVacio);
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (empleado) => {
    setFormulario(empleado);
    setMostrarFormulario(true);
  };

  const guardar = async () => {
    if (!formulario.nombre || !formulario.email || !formulario.clave) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setCargando(true);
    setError("");
    try {
      await guardarEmpleado(formulario);
      await cargarEmpleados();
      setMostrarFormulario(false);
      setFormulario(formularioVacio);
    } catch (err) {
      setError(err.message);
    }
    setCargando(false);
  };

  const toggleActivo = async (empleado) => {
    try {
      await guardarEmpleado({ ...empleado, activo: !empleado.activo });
      await cargarEmpleados();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Empleados</h4>
        <button className="btn btn-primary" onClick={abrirFormularioNuevo}>
          + Nuevo empleado
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {mostrarFormulario && (
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">{formulario.id ? "Editar empleado" : "Nuevo empleado"}</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formulario.email}
                onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Clave</label>
              <input
                type="text"
                className="form-control"
                value={formulario.clave}
                onChange={(e) => setFormulario({ ...formulario, clave: e.target.value })}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={guardar} disabled={cargando}>
              {cargando ? <span className="spinner-border spinner-border-sm" /> : "Guardar"}
            </button>
            <button className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {cargando && !mostrarFormulario ? (
        <div className="text-center"><span className="spinner-border" /></div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaEmpleados.map((empleado, index) => (
              <tr key={index}>
                <td>{empleado.nombre}</td>
                <td>{empleado.email}</td>
                <td>
                  <span className={`badge ${empleado.activo ? "bg-success" : "bg-secondary"}`}>
                    {empleado.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => abrirFormularioEditar(empleado)}
                  >
                    Editar
                  </button>
                  <button
                    className={`btn btn-sm ${empleado.activo ? "btn-outline-danger" : "btn-outline-success"}`}
                    onClick={() => toggleActivo(empleado)}
                  >
                    {empleado.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}