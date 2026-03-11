from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.empleado import Empleado
from app.models.fichaje import Fichaje
from datetime import datetime

router = APIRouter()

@router.post("/")
def registrar_fichaje(datos: dict, db: Session = Depends(get_db)):
    clave = datos.get("clave")
    dispositivo = datos.get("dispositivo", "")

    empleado = db.query(Empleado).filter(
        Empleado.clave == clave,
        Empleado.activo == True
    ).first()

    if not empleado:
        raise HTTPException(status_code=404, detail="Clave incorrecta o empleado inactivo")

    ultimo_fichaje = db.query(Fichaje).filter(
        Fichaje.empleado_id == empleado.id
    ).order_by(Fichaje.timestamp.desc()).first()

    if ultimo_fichaje and ultimo_fichaje.tipo == "entrada":
        tipo = "salida"
    else:
        tipo = "entrada"

    nuevo_fichaje = Fichaje(
        empleado_id=empleado.id,
        tipo=tipo,
        dispositivo=dispositivo,
        timestamp=datetime.utcnow()
    )

    db.add(nuevo_fichaje)
    db.commit()
    db.refresh(nuevo_fichaje)

    return {
        "tipo": tipo,
        "empleado": empleado.nombre,
        "timestamp": nuevo_fichaje.timestamp
    }