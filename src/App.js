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
import Publicacion from "./pages/publicacion/publicacion";

function App() {
  const { updateUserData, setShow } = useContext(UserContext);

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

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
