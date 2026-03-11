from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.fichaje import Fichaje
from datetime import datetime

router = APIRouter()

@router.get("/")
def obtener_historial(empleado_id: int, mes: int, anio: int, db: Session = Depends(get_db)):
    fichajes = db.query(Fichaje).filter(
        Fichaje.empleado_id == empleado_id,
        Fichaje.timestamp >= datetime(anio, mes, 1),
        Fichaje.timestamp < datetime(anio, mes + 1, 1) if mes < 12 else datetime(anio + 1, 1, 1)
    ).order_by(Fichaje.timestamp).all()

    registros = []
    entradas = [f for f in fichajes if f.tipo == "entrada"]
    salidas = [f for f in fichajes if f.tipo == "salida"]

    for entrada in entradas:
        salida = next((s for s in salidas if s.timestamp > entrada.timestamp), None)
        horas = None
        if salida:
            diferencia = salida.timestamp - entrada.timestamp
            horas = round(diferencia.seconds / 3600, 2)

        registros.append({
            "fecha": entrada.timestamp.strftime("%d/%m/%Y"),
            "hora_entrada": entrada.timestamp.strftime("%H:%M"),
            "hora_salida": salida.timestamp.strftime("%H:%M") if salida else "-",
            "horas_trabajadas": horas or "-",
            "estado": entrada.estado
        })

    return {"registros": registros}