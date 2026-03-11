from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base

# Importar modelos para que se creen las tablas
from app.models import empleado, fichaje, horario, alerta

# Importar routers
from app.routers import fichajes, empleados, horarios, historial, reportes, alertas, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Control de Fichajes API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(fichajes.router, prefix="/api/fichajes", tags=["fichajes"])
app.include_router(empleados.router, prefix="/api/empleados", tags=["empleados"])
app.include_router(horarios.router, prefix="/api/horarios", tags=["horarios"])
app.include_router(historial.router, prefix="/api/historial", tags=["historial"])
app.include_router(reportes.router, prefix="/api/reportes", tags=["reportes"])
app.include_router(alertas.router, prefix="/api/alertas", tags=["alertas"])

@app.get("/")
def root():
    return {"mensaje": "API de Control de Fichajes funcionando"}
    