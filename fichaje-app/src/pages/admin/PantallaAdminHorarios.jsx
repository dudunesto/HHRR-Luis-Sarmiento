import { useState, useEffect } from "react";
import { obtenerHorarios, guardarHorario } from "../../services/ApiService";

const formularioVacio = {
  empleado_id: "",
  dia_semana: "",
  hora_entrada: "",
  hora_salida: "",
  activo: true,
};

const DIAS = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
];

export default function PantallaAdminHorarios() {
  const [listaHorarios, setListaHorarios] = useState([]);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarHorarios();
  }, []);

  const cargarHorarios = async () => {
    setCargando(true);
    try {
      const respuesta = await obtenerHorarios();
      setListaHorarios(respuesta.horarios);
    } catch (err) {
      setError(err.message);
    }
    setCargando(false);
  };

  const abrirFormularioNuevo = () => {
    setFormulario(formularioVacio);
    setMostrarFormulario(true);
  };

  const abrirFormularioEditar = (horario) => {
    setFormulario(horario);
    setMostrarFormulario(true);
  };

  const guardar = async () => {
    if (!formulario.empleado_id || !formulario.dia_semana || !formulario.hora_entrada || !formulario.hora_salida) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setCargando(true);
    setError("");
    try {
      await guardarHorario(formulario);
      await cargarHorarios();
      setMostrarFormulario(false);
      setFormulario(formularioVacio);
    } catch (err) {
      setError(err.message);
    }
    setCargando(false);
  };

  const toggleActivo = async (horario) => {
    try {
      await guardarHorario({ ...horario, activo: !horario.activo });
      await cargarHorarios();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Horarios</h4>
        <button className="btn btn-primary" onClick={abrirFormularioNuevo}>
          + Nuevo horario
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {mostrarFormulario && (
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">{formulario.id ? "Editar horario" : "Nuevo horario"}</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">ID Empleado</label>
              <input
                type="text"
                className="form-control"
                value={formulario.empleado_id}
                onChange={(e) => setFormulario({ ...formulario, empleado_id: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Día de la semana</label>
              <select
                className="form-select"
                value={formulario.dia_semana}
                onChange={(e) => setFormulario({ ...formulario, dia_semana: e.target.value })}
              >
                <option value="">Selecciona día</option>
                {DIAS.map((dia) => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Hora entrada</label>
              <input
                type="time"
                className="form-control"
                value={formulario.hora_entrada}
                onChange={(e) => setFormulario({ ...formulario, hora_entrada: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Hora salida</label>
              <input
                type="time"
                className="form-control"
                value={formulario.hora_salida}
                onChange={(e) => setFormulario({ ...formulario, hora_salida: e.target.value })}
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
              <th>Empleado ID</th>
              <th>Día</th>
              <th>Hora entrada</th>
              <th>Hora salida</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaHorarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario.empleado_id}</td>
                <td>{horario.dia_semana}</td>
                <td>{horario.hora_entrada}</td>
                <td>{horario.hora_salida}</td>
                <td>
                  <span className={`badge ${horario.activo ? "bg-success" : "bg-secondary"}`}>
                    {horario.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => abrirFormularioEditar(horario)}
                  >
                    Editar
                  </button>
                  <button
                    className={`btn btn-sm ${horario.activo ? "btn-outline-danger" : "btn-outline-success"}`}
                    onClick={() => toggleActivo(horario)}
                  >
                    {horario.activo ? "Desactivar" : "Activar"}
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