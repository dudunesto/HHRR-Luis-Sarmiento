import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPrincipal from "./components/LayoutPrincipal";
import PantallaFichaje from "./pages/PantallaFichaje";
import PantallaHistorial from "./pages/PantallaHistorial";
import PantallaReportes from "./pages/PantallaReportes";
import PantallaAdmin from "./pages/admin/PantallaAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutPrincipal>
        <Routes>
          <Route path="/" element={<PantallaFichaje />} />
          <Route path="/historial" element={<PantallaHistorial />} />
          <Route path="/reportes" element={<PantallaReportes />} />
          <Route path="/admin" element={<PantallaAdmin />} />
        </Routes>
      </LayoutPrincipal>
    </BrowserRouter>
  );
}