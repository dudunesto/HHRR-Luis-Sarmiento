import BarraNavegacion from "./BarraNavegacion";

export default function LayoutPrincipal({ children }) {
  return (
    <>
      <BarraNavegacion />
      <main>{children}</main>
    </>
  );
}