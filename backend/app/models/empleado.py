from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Empleado(Base):
    __tablename__ = "empleados"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    clave = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    activo = Column(Boolean, default=True)
    creado_en = Column(DateTime, default=datetime.utcnow)

    fichajes = relationship("Fichaje", back_populates="empleado")
    horarios = relationship("Horario", back_populates="empleado")
    alertas = relationship("Alerta", back_populates="empleado")