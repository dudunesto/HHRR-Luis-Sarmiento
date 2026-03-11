from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Time
from sqlalchemy.orm import relationship
from app.database import Base

class Horario(Base):
    __tablename__ = "horarios"

    id = Column(Integer, primary_key=True, index=True)
    empleado_id = Column(Integer, ForeignKey("empleados.id"), nullable=False)
    dia_semana = Column(String, nullable=False)
    hora_entrada = Column(String, nullable=False)
    hora_salida = Column(String, nullable=False)
    activo = Column(Boolean, default=True)

    empleado = relationship("Empleado", back_populates="horarios")