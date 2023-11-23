import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import Hero from "./pages/hero/Hero";
import Footer from "./pages/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
