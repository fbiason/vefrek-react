import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import Hero from "./pages/hero/Hero";
import Negocios from "./pages/negocios/Negocios";
import Valores from "./pages/valores/Valores";
import Pcc from "./pages/ppc/Pcc";
import Footer from "./pages/footer/Footer";
import About from "./pages/about/About";
import Contacto from "./pages/contacto/Contacto";
import LoginApp from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginApp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
