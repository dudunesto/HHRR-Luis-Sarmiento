import { useState } from "react";
import { obtenerRegistros, ajustarRegistro } from "../../services/ApiService";

const filtrosVacios = {
  empleado_id: "",
  fecha: "",
  estado: "",
};

export default function PantallaAdminRegistros() {
  const [filtros, setFiltros] = useState(filtrosVacios);
  const [listaRegistros, setListaRegistros] = useState([]);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [motivoAjuste, setMotivoAjuste] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarRegistros = async () => {
    setCargando(true);
    setError("");

    try {
      const respuesta = await obtenerRegistros(filtros);
      setListaRegistros(respuesta.registros);
    } catch (err) {
      setError(err.message);
    }

    setCargando(false);
  };

  const accionAjustarRegistro = async () => {
    if (!motivoAjuste) {
      setError("Debes introducir un motivo para el ajuste");
      return;
    }

    setCargando(true);
    setError("");

    try {
      await ajustarRegistro({ ...registroSeleccionado, motivo: motivoAjuste });
      await cargarRegistros();
      setRegistroSeleccionado(null);
      setMotivoAjuste("");
    } catch (err) {
      setError(err.message);
    }

    setCargando(false);
  };

  return (
    <div>
      <h4 className="mb-4">Registros</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <label className="form-label">ID Empleado</label>
          <input
            type="text"
            className="form-control"
            value={filtros.empleado_id}
            onChange={(e) => setFiltros({ ...filtros, empleado_id: e.target.value })}
            placeholder="Ej: 123"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={filtros.fecha}
            onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="completo">Completo</option>
            <option value="incompleto">Incompleto</option>
            <option value="ajustado">Ajustado</option>
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button
            className="btn btn-primary w-100"
            onClick={cargarRegistros}
            disabled={cargando}
          >
            {cargando ? <span className="spinner-border spinner-border-sm" /> : "Buscar"}
          </button>
        </div>
      </div>

      {/* Tabla */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Hora entrada</th>
            <th>Hora salida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaRegistros.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No hay registros. Usa los filtros y pulsa Buscar.
              </td>
            </tr>
          ) : (
            listaRegistros.map((registro, index) => (
              <tr key={index}>
                <td>{registro.empleado}</td>
                <td>{registro.fecha}</td>
                <td>{registro.hora_entrada}</td>
                <td>{registro.hora_salida}</td>
                <td>
                  <span className={`badge ${
                    registro.estado === "completo" ? "bg-success" :
                    registro.estado === "ajustado" ? "bg-warning text-dark" :
                    "bg-danger"
                  }`}>
                    {registro.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => {
                      setRegistroSeleccionado(registro);
                      setMotivoAjuste("");
                    }}
                  >
                    Ajustar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Panel de ajuste */}
      {registroSeleccionado && (
        <div className="card p-4 mt-4 shadow-sm border-warning">
          <h5 className="mb-3">Ajustar registro</h5>
          <p>
            <strong>Empleado:</strong> {registroSeleccionado.empleado} —{" "}
            <strong>Fecha:</strong> {registroSeleccionado.fecha}
          </p>
          <div className="mb-3">
            <label className="form-label">Motivo del ajuste</label>
            <textarea
              className="form-control"
              rows={3}
              value={motivoAjuste}
              onChange={(e) => setMotivoAjuste(e.target.value)}
              placeholder="Describe el motivo del ajuste..."
            />
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={accionAjustarRegistro}
              disabled={cargando}
            >
              {cargando ? <span className="spinner-border spinner-border-sm" /> : "Confirmar ajuste"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setRegistroSeleccionado(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}