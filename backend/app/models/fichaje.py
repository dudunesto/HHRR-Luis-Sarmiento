from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Fichaje(Base):
    __tablename__ = "fichajes"

    id = Column(Integer, primary_key=True, index=True)
    empleado_id = Column(Integer, ForeignKey("empleados.id"), nullable=False)
    tipo = Column(String, nullable=False)  # "entrada" o "salida"
    timestamp = Column(DateTime, default=datetime.utcnow)
    dispositivo = Column(String, nullable=True)
    ip_origen = Column(String, nullable=True)
    estado = Column(String, default="completo")  # completo, incompleto, ajustado
    motivo_ajuste = Column(String, nullable=True)

    empleado = relationship("Empleado", back_populates="fichajes")