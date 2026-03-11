from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.empleado import Empleado
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def login_admin(credenciales: dict, db: Session = Depends(get_db)):
    email = credenciales.get("email")
    password = credenciales.get("password")

    empleado = db.query(Empleado).filter(Empleado.email == email).first()

    if not empleado:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Verificar si la clave almacenada es un hash bcrypt
    try:
        verificado = pwd_context.verify(password, empleado.clave)
    except Exception:
        verificado = (password == empleado.clave)

    if not verificado:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {
        "mensaje": "Login correcto",
        "empleado_id": empleado.id,
        "nombre": empleado.nombre
    }