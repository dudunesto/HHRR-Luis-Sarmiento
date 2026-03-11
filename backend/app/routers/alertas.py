from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.alerta import Alerta
from datetime import datetime

router = APIRouter()

@router.get("/")
def obtener_alertas(fecha: str, db: Session = Depends(get_db)):
    fecha_dt = datetime.strptime(fecha, "%Y-%m-%d")
    alertas = db.query(Alerta).filter(
        Alerta.hora_envio >= fecha_dt,
        Alerta.hora_envio < datetime(fecha_dt.year, fecha_dt.month, fecha_dt.day + 1)
    ).all()

    return {"alertas": [
        {
            "empleado": a.empleado_id,
            "tipo": a.tipo,
            "hora_envio": a.hora_envio.strftime("%H:%M"),
            "telefono_destino": a.telefono_destino,
            "estado": a.estado,
            "detalle_error": a.detalle_error
        } for a in alertas
    ]}