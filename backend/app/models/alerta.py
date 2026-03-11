from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Alerta(Base):
    __tablename__ = "alertas"

    id = Column(Integer, primary_key=True, index=True)
    empleado_id = Column(Integer, ForeignKey("empleados.id"), nullable=False)
    tipo = Column(String, nullable=False)
    hora_envio = Column(DateTime, default=datetime.utcnow)
    telefono_destino = Column(String, nullable=True)
    estado = Column(String, default="pendiente")  # enviado, fallido, pendiente
    detalle_error = Column(String, nullable=True)

    empleado = relationship("Empleado", back_populates="alertas")