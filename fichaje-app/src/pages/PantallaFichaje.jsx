import { useState } from "react";
import { enviarFichaje } from "../services/ApiService";

export default function PantallaFichaje() {
  const [claveEmpleado, setClaveEmpleado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const accionEnviarFichaje = async () => {
    if (!claveEmpleado.trim()) {
      setMensaje("Debes introducir tu clave");
      setTipoMensaje("error");
      return;
    }

    setCargando(true);
    setMensaje("");

    try {
      const dispositivo = navigator.userAgent;
      const respuesta = await enviarFichaje(claveEmpleado, dispositivo);

      if (respuesta.tipo === "entrada") {
        setMensaje("OK - Entrada registrada");
      } else if (respuesta.tipo === "salida") {
        setMensaje("OK - Salida registrada");
      }
      setTipoMensaje("exito");
      setClaveEmpleado("");
    } catch (error) {
      setMensaje(error.message);
      setTipoMensaje("error");
    }

    setCargando(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ minWidth: "350px" }}>
        <h2 className="text-center mb-4">Control de Acceso</h2>

        <div className="mb-3">
          <label className="form-label">Clave de empleado</label>
          <input
            type="password"
            className="form-control"
            value={claveEmpleado}
            onChange={(e) => setClaveEmpleado(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && accionEnviarFichaje()}
            disabled={cargando}
            placeholder="Introduce tu clave"
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={accionEnviarFichaje}
          disabled={cargando}
        >
          {cargando && <span className="spinner-border spinner-border-sm me-2" />}
          {cargando ? "Fichando..." : "Fichar"}
        </button>

        {mensaje && (
          <div className={`alert mt-3 ${tipoMensaje === "exito" ? "alert-success" : "alert-danger"}`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}