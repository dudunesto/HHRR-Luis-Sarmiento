import { useState } from "react";
import { obtenerReporte, descargarReporte } from "../services/ApiService";

export default function PantallaReportes() {
  const [empleadoId, setEmpleadoId] = useState("");
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const accionGenerarReporte = async () => {
    if (!empleadoId || !mes || !anio) {
      setError("Debes rellenar todos los campos");
      return;
    }

    setCargando(true);
    setError("");
    setReporte(null);

    try {
      const respuesta = await obtenerReporte(empleadoId, mes, anio);
      setReporte(respuesta.reporte);
    } catch (err) {
      setError(err.message);
    }

    setCargando(false);
  };

  const accionDescargar = async (formato) => {
    try {
      await descargarReporte(empleadoId, mes, anio, formato);
    } catch {
      setError("No se pudo descargar el reporte");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Reportes</h2>

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
            onClick={accionGenerarReporte}
            disabled={cargando}
          >
            {cargando ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              "Generar reporte"
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Resultado */}
      {reporte && (
        <div className="card p-4 shadow">
          <h5 className="mb-3">Resumen del mes</h5>
          <table className="table table-bordered mb-4">
            <thead className="table-dark">
              <tr>
                <th>Día</th>
                <th>Horas trabajadas</th>
              </tr>
            </thead>
            <tbody>
              {reporte.horas_por_dia.map((dia, index) => (
                <tr key={index}>
                  <td>{dia.fecha}</td>
                  <td>{dia.horas}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p><strong>Total semanal:</strong> {reporte.horas_por_semana} h</p>
          <p><strong>Total mensual:</strong> {reporte.total_mensual} h</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-success"
              onClick={() => accionDescargar("pdf")}
            >
              Descargar PDF
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => accionDescargar("xlsx")}
            >
              Descargar Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}