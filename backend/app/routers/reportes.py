from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.fichaje import Fichaje
from datetime import datetime

router = APIRouter()

@router.get("/")
def obtener_reporte(empleado_id: int, mes: int, anio: int, db: Session = Depends(get_db)):
    fichajes = db.query(Fichaje).filter(
        Fichaje.empleado_id == empleado_id,
        Fichaje.timestamp >= datetime(anio, mes, 1),
        Fichaje.timestamp < datetime(anio, mes + 1, 1) if mes < 12 else datetime(anio + 1, 1, 1)
    ).order_by(Fichaje.timestamp).all()

    entradas = [f for f in fichajes if f.tipo == "entrada"]
    salidas = [f for f in fichajes if f.tipo == "salida"]

    horas_por_dia = []
    total_mensual = 0

    for entrada in entradas:
        salida = next((s for s in salidas if s.timestamp > entrada.timestamp), None)
        if salida:
            horas = round((salida.timestamp - entrada.timestamp).seconds / 3600, 2)
            total_mensual += horas
            horas_por_dia.append({
                "fecha": entrada.timestamp.strftime("%d/%m/%Y"),
                "horas": horas
            })

    return {
        "reporte": {
            "horas_por_dia": horas_por_dia,
            "horas_por_semana": round(total_mensual / 4, 2),
            "total_mensual": round(total_mensual, 2)
        }
    }