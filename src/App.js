import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import Hero from "./pages/hero/Hero";
import Negocios from "./pages/negocios/Negocios";
import Valores from "./pages/valores/Valores";
import Pcc from "./pages/ppc/Pcc";
import Footer from "./pages/footer/Footer";
import About from "./pages/about/About";
import Premium from "./pages/premium/Premium";
import Counts from "./pages/counts/Counts";
import Contacto from "./pages/contacto/Contacto";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Hero />
      <Negocios />
      <Pcc />
      <Counts />
      <About />
      <Valores />
      <Premium />
      <Contacto />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
