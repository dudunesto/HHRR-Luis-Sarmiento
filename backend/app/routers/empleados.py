from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.empleado import Empleado
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/")
def obtener_empleados(db: Session = Depends(get_db)):
    empleados = db.query(Empleado).all()
    return {"empleados": [
        {
            "id": e.id,
            "nombre": e.nombre,
            "email": e.email,
            "telefono": e.telefono,
            "activo": e.activo
        } for e in empleados
    ]}

@router.post("/")
def crear_empleado(datos: dict, db: Session = Depends(get_db)):
    existe = db.query(Empleado).filter(Empleado.email == datos.get("email")).first()
    if existe:
        raise HTTPException(status_code=400, detail="Ya existe un empleado con ese email")

    nuevo = Empleado(
        nombre=datos.get("nombre"),
        email=datos.get("email"),
        clave=pwd_context.hash(datos.get("clave")),
        telefono=datos.get("telefono"),
        activo=datos.get("activo", True)
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return {"mensaje": "Empleado creado", "id": nuevo.id}

@router.put("/{empleado_id}")
def actualizar_empleado(empleado_id: int, datos: dict, db: Session = Depends(get_db)):
    empleado = db.query(Empleado).filter(Empleado.id == empleado_id).first()
    if not empleado:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")

    empleado.nombre = datos.get("nombre", empleado.nombre)
    empleado.email = datos.get("email", empleado.email)
    empleado.telefono = datos.get("telefono", empleado.telefono)
    empleado.activo = datos.get("activo", empleado.activo)

    if datos.get("clave"):
        empleado.clave = pwd_context.hash(datos.get("clave"))

    db.commit()
    return {"mensaje": "Empleado actualizado"}