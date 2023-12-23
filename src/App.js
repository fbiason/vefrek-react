import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import LoginApp from "./pages/login/Login";
import { isLogged } from "./utils/auth/isLogged";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Footer from "./pages/footer/Footer";
import { Navigate } from "react-router-dom";
import Perfil from "./pages/perfil/Perfil";
import Publicacion from "./pages/publicacion/Publicacion";
import CargaEmpresa from "./pages/carga-empresa/CargaEmpresa";
import PaginaEmpresa from "./pages/pagina-empresa/PaginaEmpresa";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import Reparacion from "./pages/reparacion/Reparacion";
import Venta from "./pages/venta/Venta";
import OtrosServicios from "./pages/otros-servicios/OtrosServicios";

function App() {
  const { updateUserData, setShow, userData } = useContext(UserContext);

  useEffect(() => {
    const verifiLog = async () => {
      const response = await isLogged();
      if (response.userData) {
        updateUserData(response.userData);
      } else {
        updateUserData({ email: "", name: "", isLogged: false });
      }
      setShow(true);
    };
    verifiLog();
  }, []);

  return (
    <BrowserRouter>
      <NextUIProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginApp />} />
          {userData.isLogged && <Route path="/perfil" element={<Perfil />} />}
          <Route path="/Publicacion" element={<Publicacion />} />
          {userData.isLogged && <Route path="/CargaEmpresa" element={<CargaEmpresa />} />}
          <Route path="/PaginaEmpresa" element={<PaginaEmpresa />} />
          <Route path="/Reparacion" element={<Reparacion />} />
          <Route path="/Venta" element={<Venta />} />
          <Route path="/OtrosServicios" element={<OtrosServicios />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
