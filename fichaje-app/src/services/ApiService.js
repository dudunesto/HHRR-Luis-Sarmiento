const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Error en la solicitud");
  }

  return response.json();
}

// ── Fichaje ──────────────────────────────────────────
export function enviarFichaje(claveEmpleado, dispositivoActual) {
  return request("/fichajes", {
    method: "POST",
    body: JSON.stringify({
      clave: claveEmpleado,
      dispositivo: dispositivoActual,
    }),
  });
}

// ── Historial ────────────────────────────────────────
export function obtenerHistorial(empleadoId, mes, anio) {
  return request(`/historial/?empleado_id=${empleadoId}&mes=${mes}&anio=${anio}`);
}

// ── Reportes ─────────────────────────────────────────
export function obtenerReporte(empleadoId, mes, anio) {
  return request(`/reportes/?empleado_id=${empleadoId}&mes=${mes}&anio=${anio}`);
}

export async function descargarReporte(empleadoId, mes, anio, formato) {
  const response = await fetch(
    `${BASE_URL}/reportes/descargar/?empleado_id=${empleadoId}&mes=${mes}&anio=${anio}&formato=${formato}`
  );
  if (!response.ok) throw new Error("No se pudo descargar el reporte");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `reporte_${mes}_${anio}.${formato}`;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ── Admin: autenticación ─────────────────────────────
export function loginAdmin(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
// ── Admin: empleados ─────────────────────────────────
export function obtenerEmpleados() {
  return request("/empleados/");
}

export function guardarEmpleado(datos) {
  const metodo = datos.id ? "PUT" : "POST";
  const endpoint = datos.id ? `/empleados/${datos.id}/` : "/empleados/";
  return request(endpoint, {
    method: metodo,
    body: JSON.stringify(datos),
  });
}

// ── Admin: horarios ──────────────────────────────────
export function obtenerHorarios() {
  return request("/horarios/");
}

export function guardarHorario(datos) {
  const metodo = datos.id ? "PUT" : "POST";
  const endpoint = datos.id ? `/horarios/${datos.id}/` : "/horarios/";
  return request(endpoint, {
    method: metodo,
    body: JSON.stringify(datos),
  });
}

// ── Admin: registros ─────────────────────────────────
export function obtenerRegistros(filtros) {
  const params = new URLSearchParams(filtros).toString();
  return request(`/registros/?${params}`);
}

export function ajustarRegistro(datos) {
  return request(`/registros/${datos.id}/ajustar/`, {
    method: "PATCH",
    body: JSON.stringify(datos),
  });
}

// ── Admin: alertas ───────────────────────────────────
export function obtenerAlertas(filtros) {
  const params = new URLSearchParams(filtros).toString();
  return request(`/alertas/?${params}`);
}