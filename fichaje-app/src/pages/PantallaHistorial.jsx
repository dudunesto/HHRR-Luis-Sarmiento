import { useState } from "react";
import { obtenerHistorial } from "../services/ApiService";

export default function PantallaHistorial() {
  const [empleadoId, setEmpleadoId] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [listaRegistros, setListaRegistros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarHistorial = async () => {
    if (!empleadoId || !mes || !anio) {
      setError("Debes rellenar todos los campos");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const respuesta = await obtenerHistorial(empleadoId, mes, anio);
      setListaRegistros(respuesta.registros);
    } catch (err) {
      setError(err.message);
    }

    setCargando(false);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Historial de fichajes</h2>

      {/* Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">ID de empleado</label>
          <input
            type="text"
            className="form-control"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            placeholder="Ej: 123"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Mes</label>
          <select
            className="form-select"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">Selecciona mes</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Año</label>
          <input
            type="number"
            className="form-control"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ej: 2026"
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button
            className="btn btn-primary w-100"
            onClick={cargarHistorial}
            disabled={cargando}
          >
            {cargando ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              "Consultar"
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabla de resultados */}
      {listaRegistros.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Hora entrada</th>
              <th>Hora salida</th>
              <th>Horas trabajadas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {listaRegistros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.fecha}</td>
                <td>{registro.hora_entrada}</td>
                <td>{registro.hora_salida}</td>
                <td>{registro.horas_trabajadas}</td>
                <td>{registro.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !cargando && <p className="text-muted">No hay registros para mostrar.</p>
      )}
    </div>
  );
}