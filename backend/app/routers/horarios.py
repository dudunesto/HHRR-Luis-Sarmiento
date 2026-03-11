from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.horario import Horario

router = APIRouter()

@router.get("/")
def obtener_horarios(db: Session = Depends(get_db)):
    horarios = db.query(Horario).all()
    return {"horarios": [
        {
            "id": h.id,
            "empleado_id": h.empleado_id,
            "dia_semana": h.dia_semana,
            "hora_entrada": h.hora_entrada,
            "hora_salida": h.hora_salida,
            "activo": h.activo
        } for h in horarios
    ]}

@router.post("/")
def crear_horario(datos: dict, db: Session = Depends(get_db)):
    nuevo = Horario(
        empleado_id=datos.get("empleado_id"),
        dia_semana=datos.get("dia_semana"),
        hora_entrada=datos.get("hora_entrada"),
        hora_salida=datos.get("hora_salida"),
        activo=datos.get("activo", True)
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return {"mensaje": "Horario creado", "id": nuevo.id}

@router.put("/{horario_id}")
def actualizar_horario(horario_id: int, datos: dict, db: Session = Depends(get_db)):
    horario = db.query(Horario).filter(Horario.id == horario_id).first()
    if not horario:
        raise HTTPException(status_code=404, detail="Horario no encontrado")

    horario.dia_semana = datos.get("dia_semana", horario.dia_semana)
    horario.hora_entrada = datos.get("hora_entrada", horario.hora_entrada)
    horario.hora_salida = datos.get("hora_salida", horario.hora_salida)
    horario.activo = datos.get("activo", horario.activo)

    db.commit()
    return {"mensaje": "Horario actualizado"}