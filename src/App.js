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
import Categorias from "./pages/categorias/Categorias";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginApp />} />
        {userData.isLogged && <Route path="/perfil" element={<Perfil />} />}    
        <Route path="/Publicacion" element={<Publicacion />} />
        {userData.isLogged && <Route path="/CargaEmpresa" element={<CargaEmpresa />} />}
        <Route path="/PaginaEmpresa" element={<PaginaEmpresa />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
