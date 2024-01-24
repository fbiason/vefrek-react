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
import { SpinnerContext } from "./context/spinnerContext";
import Dropdown from "./pages/dropdown/Dropdown";
import MisEmpresas from "./pages/misEmpresas/MisEmpresas";
import Contacto from "./pages/contacto/Contacto";
import LoginUser from "./pages/loginUser/LoginUser";
import EditarEmpresa from "./pages/editarEmpresa/EditarEmpresa";
import ReactGA from "react-ga";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
    ReactGA.initialize("G-J1JT10S65V");
    const { updateUserData, setShow, userData, show } = useContext(UserContext);
    const { spinner } = useContext(SpinnerContext);

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
        // eslint-disable-next-line
    }, []);

<<<<<<< HEAD
  return (
    <BrowserRouter>
      <NextUIProvider>
        {spinner}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginApp />} />
          <Route path="/Publicacion" element={<Publicacion />} />
          <Route path="/Reparacion" element={<Reparacion />} />
          <Route path="/Venta" element={<Venta />} />
          <Route path="/OtrosServicios" element={<OtrosServicios />} />
          <Route path="/Dropdown" element={<Dropdown />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          <Route
            path="/MisEmpresas"
            element={
              ((!show || userData.isLogged) && <MisEmpresas />) ||
              ((show || !userData.isLogged) && <Navigate to="/" />)
            }
          />
          <Route
            path="/EditarEmpresa/:id?"
            element={
              ((!show || userData.isLogged) && <EditarEmpresa />) ||
              ((show || !userData.isLogged) && <Navigate to="/" />)
            }
          />
          <Route
            path="/CargaEmpresa"
            element={
              ((!show || userData.isLogged) && <CargaEmpresa />) ||
              ((show || !userData.isLogged) && <Navigate to="/" />)
            }
          />
          <Route
            path="/perfil"
            element={
              ((!show || userData.isLogged) && <Perfil />) ||
              ((show || !userData.isLogged) && <Navigate to="/" />)
            }
          />
          {!userData.isLogged && (
            <Route path="/loginuser/:token?" element={<LoginUser />} />
          )}
          <Route path="/:vefrek_website" element={<PaginaEmpresa />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </NextUIProvider>
    </BrowserRouter>
  );
=======
    return (
        <BrowserRouter>
            <NextUIProvider>
                {spinner}
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginApp />} />
                    <Route path="/Publicacion" element={<Publicacion />} />
                    <Route path="/Reparacion" element={<Reparacion />} />
                    <Route path="/Venta" element={<Venta />} />
                    <Route path="/OtrosServicios" element={<OtrosServicios />} />
                    <Route path="/Dropdown" element={<Dropdown />} />
                    <Route path="/Contacto" element={<Contacto />} />
                    <Route
                        path="/MisEmpresas"
                        element={
                            ((!show || userData.isLogged) && <MisEmpresas />) ||
                            ((show || !userData.isLogged) && <Navigate to="/" />)
                        }
                    />
                    <Route
                        path="/EditarEmpresa/:id?"
                        element={
                            ((!show || userData.isLogged) && <EditarEmpresa />) ||
                            ((show || !userData.isLogged) && <Navigate to="/" />)
                        }
                    />
                    <Route
                        path="/CargaEmpresa"
                        element={
                            ((!show || userData.isLogged) && <CargaEmpresa />) ||
                            ((show || !userData.isLogged) && <Navigate to="/" />)
                        }
                    />
                    <Route
                        path="/perfil"
                        element={
                            ((!show || userData.isLogged) && <Perfil />) ||
                            ((show || !userData.isLogged) && <Navigate to="/" />)
                        }
                    />
                    {!userData.isLogged && (
                        <Route path="/loginuser/:token?" element={<LoginUser />} />
                    )}
                    <Route path="/:vefrek_website" element={<PaginaEmpresa />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </NextUIProvider>
        </BrowserRouter>
    );
>>>>>>> f2f144af76cd997b47c0e2e62760035b7063c88f
}

export default App;
