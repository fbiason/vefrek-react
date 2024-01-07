import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import NavBar from "./pages/navbar/NavBar";
import LoginApp from "./pages/login/Login";
import { isLogged } from "./utils/auth/isLogged";
import { useContext, useEffect, useState } from "react";
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
import { BgSpinner } from "./components/spinner/Spinner";
import NoAutorizado from "./pages/noAutorizado/NoAutorizado";

function App() {
	const { updateUserData, setShow, userData } = useContext(UserContext);
	const { spinner } = useContext(SpinnerContext);
	const [logging, setLogging] = useState(false);

	useEffect(() => {
		const verifiLog = async () => {
			setLogging(true);
			const response = await isLogged();
			if (response.userData) {
				updateUserData(response.userData);
			} else {
				updateUserData({ email: "", name: "", isLogged: false });
			}
			setShow(true);
			setLogging(false);
		};
		verifiLog();
		// eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<NextUIProvider>
				{spinner}
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:name" element={<PaginaEmpresa />} />
					<Route path="/login" element={<LoginApp />} />
					{userData.isLogged && <Route path="/perfil" element={<Perfil />} />}
					<Route path="/Publicacion" element={<Publicacion />} />
					{userData.isLogged && (
						<Route path="/CargaEmpresa" element={<CargaEmpresa />} />
					)}
					{!userData.isLogged && <Route path="/loginuser/:token?" element={<LoginUser />} />}
					<Route path="/Reparacion" element={<Reparacion />} />
					<Route path="/Venta" element={<Venta />} />
					<Route path="/OtrosServicios" element={<OtrosServicios />} />
					<Route path="/Dropdown" element={<Dropdown />} />
					<Route path="/Contacto" element={<Contacto />} />
					{userData.isLogged && <Route path="/MisEmpresas" element={<MisEmpresas />} />}

					{
						(logging
							&& <Route path="/EditarEmpresa/:id" element={<BgSpinner />} />
						) ||
						(!logging &&
							((userData.isLogged && <Route path="/EditarEmpresa/:id" element={<EditarEmpresa />} />)
								||
								(!userData.isLogged && <Route path="/EditarEmpresa/:id" element={<NoAutorizado />} />))
						)
					}			

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Footer />
			</NextUIProvider>
		</BrowserRouter>
	);
}

export default App;
