import React from "react";
import Hero from "../hero/Hero";
import About from "../about/About";
import Contacto from "../contacto/Contacto";
import Pcc from "../ppc/Pcc";
import Negocios from "../negocios/Negocios";
import Valores from "../valores/Valores";
import ReactGA from "react-ga";

const Home = () => {
  componentDidMount() {
    // Inicializa el seguimiento de Google Analytics
    ReactGA.initialize("G-J1JT10S65V");
  }
  return (
    <>
      <Hero />
      <Negocios />
      <Valores />
      <Pcc />
      <About />
      <Contacto />
    </>
  );
};

export default Home;
