import { useState } from "react";
import { obtenerAlertas } from "../../services/ApiService";

export default function PantallaAdminAlertas() {
  const [fecha, setFecha] = useState("");
  const [listaAlertas, setListaAlertas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarAlertas = async () => {
    if (!fecha) {
      setError("Debes seleccionar una fecha");
      return;
    }

    setCargando(true);
    setError("");

    try {
      const respuesta = await obtenerAlertas({ fecha });
      setListaAlertas(respuesta.alertas);
    } catch (err) {
      setError(err.message);
    }

    setCargando(false);
  };

  return (
    <div>
      <h4 className="mb-4">Alertas</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filtro */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button
            className="btn btn-primary w-100"
            onClick={cargarAlertas}
            disabled={cargando}
          >
            {cargando ? <span className="spinner-border spinner-border-sm" /> : "Consultar"}
          </button>
        </div>
      </div>

      {/* Tabla */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Empleado</th>
            <th>Tipo de alerta</th>
            <th>Hora de envío</th>
            <th>Teléfono destino</th>
            <th>Estado</th>
            <th>Detalle error</th>
          </tr>
        </thead>
        <tbody>
          {listaAlertas.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No hay alertas. Selecciona una fecha y pulsa Consultar.
              </td>
            </tr>
          ) : (
            listaAlertas.map((alerta, index) => (
              <tr key={index}>
                <td>{alerta.empleado}</td>
                <td>{alerta.tipo}</td>
                <td>{alerta.hora_envio}</td>
                <td>{alerta.telefono_destino}</td>
                <td>
                  <span className={`badge ${alerta.estado === "enviado" ? "bg-success" : "bg-danger"}`}>
                    {alerta.estado}
                  </span>
                </td>
                <td>{alerta.detalle_error || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}