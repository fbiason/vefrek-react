import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";
import "../styles/home/home.css";
import "../styles/home/hero.css";
import "../styles/home/about.css";
import "../styles/home/ppc.css";
import "../styles/home/values.css";
import "../styles/home/contacto.css";
import SearchBar from "../components/NavBar/SearchBar";
import Negocios from "./Negocios";
import { useEffect, useState } from "react";
import { swalPopUp, swalPopUpWithCallbacks } from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";
import { findCompanys } from "../utils/apiDb/apiDbAcions";

const Home = () => {
    const [negocios, setNegocios] = useState(<></>);
    const { showSpinner } = useContext(SpinnerContext);

    // Cargar negocios aleatorios
    const cargarNegociosAleatorios = async () => {
        showSpinner(true);
        
        try {
            // Definimos una consulta para obtener negocios aleatorios
            const randomQuery = JSON.stringify({ status: "active" });
            
            // Usamos un aggregate para obtener una muestra aleatoria
            const aggregateQueryJSON = JSON.stringify([
                { $sample: { size: 8 } },
                {
                    $project: {
                        subcategory: 1,
                        name: 1,
                        "images.images": 1,
                        location: 1,
                        phone: 1,
                        _id: 1,
                        vefrek_website: 1,
                        favorites: 1,
                    },
                },
            ]);
            
            const response = await findCompanys(randomQuery, aggregateQueryJSON);
            
            if (response.success && response.companysData) {
                // Establecemos los negocios usando el componente Negocios con la prop showRandomCompanies
                setNegocios(<Negocios randomCompanies={response.companysData} />);
            } else {
                // Si hay un error, mostramos el componente Negocios normal sin ubicación
                setNegocios(<Negocios limitedTo300Km={false} />);
            }
        } catch (error) {
            console.error("Error al cargar negocios aleatorios:", error);
            setNegocios(<Negocios limitedTo300Km={false} />);
        } finally {
            showSpinner(false);
        }
    };

    useEffect(() => {
        const setNegociosUpTo300Km = (opc) => {
            if (opc) {
                setNegocios(<Negocios limitedTo300Km={true} />);
                localStorage.setItem("negociosUpTo300Km", true);
            } else {
                // Cuando el usuario no comparte ubicación, cargamos negocios aleatorios
                cargarNegociosAleatorios();
                localStorage.setItem("negociosUpTo300Km", false);
            }
        };

        const optionCompanysUpTo300Km = JSON.parse(
            localStorage.getItem("negociosUpTo300Km")
        );

        if (optionCompanysUpTo300Km === null) {
            // Si es la primera vez, cargar negocios aleatorios por defecto mientras se muestra el modal
            cargarNegociosAleatorios();
            
            swalPopUpWithCallbacks(
                "Quieres compartir tu ubicación?",
                "Filtraremos los anuncios por cercanía",
                "info",
                () => setNegociosUpTo300Km(true),
                () => setNegociosUpTo300Km(false)
            );
        } else if (optionCompanysUpTo300Km === true) {
            setNegociosUpTo300Km(true);
        } else if (optionCompanysUpTo300Km === false) {
            cargarNegociosAleatorios();
        }
    }, []);

    /***************************** Formulario de contacto ************************************/

    const formRef = useRef(null);

    const validateForm = async () => {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        const formValues = Object.values(data);

        if (formValues.every((input) => input.trim() !== "")) {
            sendContactForm();
        } else {
            swalPopUp("Ops!", "Falta Ingresar Algún Dato", "warning");
        }
    };

    const sendContactForm = async () => {
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        try {
            showSpinner(true);
            const respJSON = await fetch("/sendmail.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const respOBJ = await respJSON.json();
            showSpinner(false);
            if (respOBJ.msg.includes("Error")) {
                swalPopUp("Ops!", `${respOBJ.msg}, Intente otra vez`, "error");
            } else {
                const inputs = document.querySelectorAll(".inputForm");
                inputs.forEach((input) => (input.value = ""));
                swalPopUp(
                    "Enviado!",
                    "Mensaje enviado con éxito, gracias por contactarnos!",
                    "success"
                );
                const contactInputs = document.querySelectorAll(".contactInput");
                contactInputs.forEach((input) => (input.value = ""));
            }
        } catch (err) {
            showSpinner(false);
            swalPopUp(
                "Ops!",
                err instanceof Error
                    ? `Error al enviar el mensaje: ${err.message}`
                    : "Error al enviar el mensaje: problema desconocido",
                "error"
            );
        }
    };
    /*****************************************************************/

    return (
        <div className="page-wrapper">
            <section id="hero" className="hero-section">
                <div className="container">
                    <div className="logo-hero">
                        <img
                            src="/images/logos/logo-vefrek.png"
                            alt="Vefrek"
                            className="logo-image"
                        />
                        <div className="hero-title">
                            <h2>La guía más completa del rubro automotor</h2>
                        </div>
                    </div>
                    <div className="search-bar-container">
                        <SearchBar />
                    </div>
                    <div className="categories-container">
                        <div className="category-item">
                            <Link to="/Reparacion">
                                <div className="btn-categoria icon-box">
                                    <i className="ri-tools-line"></i>
                                    <h3>Reparación y Mantenimiento</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="category-item">
                            <Link to="/Venta">
                                <div className="btn-categoria icon-box">
                                    <i className="ri-car-line"></i>
                                    <h3>Venta y Alquiler de Vehículos</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="category-item">
                            <Link to="/OtrosServicios">
                                <div className="btn-categoria icon-box">
                                    <i className="ri-gas-station-line"></i>
                                    <h3>Otros Servicios</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="business-section">
            <div className="section-title">
            <h3>Encontrá lo que tu vehículo necesita</h3>
                {negocios}
                </div>
            </section>

            <section id="about" className="about">
                <div className="container" data-aos="fade-up">
                    <div className="about-content">
                        <div
                            className="about-image"
                            data-aos="fade-right"
                            data-aos-delay="100"
                        >
                            <img
                                src="images/about.webp"
                                alt="Sobre Vefrek"
                            />
                        </div>
                        <div
                            className="about-text"
                            data-aos="fade-left"
                            data-aos-delay="100"
                        >
                            <h3 className="mt-3">¿Qué es VEFREK?</h3>
                            <p className="mt-3">
                                Somos una plataforma especializada en proporcionarte información
                                detallada, relevante y actualizada sobre una amplia gama de
                                empresas relacionadas con el sector automotor.
                            </p>
                            <p>
                                Desde agencias de automóviles hasta talleres mecánicos,
                                gomerías, rent a car, casas de repuestos, lubricentros,
                                aseguradoras, estaciones de servicio y servicios de estética
                                automotriz, nuestro objetivo es ofrecerte un catálogo completo
                                que cubra todas tus necesidades en un solo lugar.
                            </p>
                            <p>
                                Trabajamos día a día para mejorar la experiencia de nuestros
                                usuarios y potenciar el posicionamiento de las empresas dando
                                una mayor difusión de las mismas, asesorándolas para que estas
                                puedan generar un incremento en sus visitas, siempre demostrando
                                nuestro profesionalismo y transparencia.
                            </p>
                            <p>
                                Te invitamos a explorar nuestro sitio y descubrir la amplia
                                variedad de empresas que tenemos para ofrecerte. Somos Vefrek,
                                la guía más completa del rubro automotor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="ppc" className="ppc-section">
                <div>
                    <div className="ppc-content">
                        <h3>POTENCIA AÚN MÁS A TU EMPRESA</h3>
                        <p>
                            Te brindamos la posibilidad de difundir a tu empresa e incrementar
                            el alcance totalmente GRATIS
                        </p>
                        <Link to="/publicacion">
                            <div className="ppc-btn">PUBLICITÁ AHORA</div>
                        </Link>
                    </div>
                </div>
            </section>

            <section id="values" className="values-section">
            <div className="container" data-aos="fade-up">
            <div className="section-title">
                        <h3>NUESTROS VALORES</h3>
                    </div>
                    <div className="values-grid">
                        <div className="value-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="value-icon">
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="value-content">
                                <h4>Responsabilidad</h4>
                                <p>
                                    Cumplimos con todas las obligaciones que nos comprometemos a
                                    realizar tanto con nuestros empleados como con nuestros
                                    clientes.
                                </p>
                            </div>
                        </div>
                        
                        <div className="value-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="value-icon">
                                <i className="bx bx-cube-alt"></i>
                            </div>
                            <div className="value-content">
                                <h4>Simplicidad</h4>
                                <p>Ofrecemos un servicio claro y de fácil acceso.</p>
                            </div>
                        </div>
                        
                        <div className="value-item" data-aos="fade-up" data-aos-delay="300">
                            <div className="value-icon">
                                <i className="bx bx-compass"></i>
                            </div>
                            <div className="value-content">
                                <h4>Orientación al cliente</h4>
                                <p>
                                    Trabajamos para que las empresas puedan mejorar la difusión
                                    de sus negocios y logren un mayor alcance.
                                </p>
                            </div>
                        </div>
                        
                        <div className="value-item" data-aos="fade-up" data-aos-delay="400">
                            <div className="value-icon">
                                <i className="bx bx-star"></i>
                            </div>
                            <div className="value-content">
                                <h4>Excelencia</h4>
                                <p>
                                    Buscamos superarnos día a día y que los resultados se
                                    reflejen en la calidad de atención a los clientes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h3>CONTACTANOS</h3>
                    </div>

                    <div className="row">
                        <div className="contact-section">
                            <div className="contact-info">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.5367865926187!2d-69.230385!3d-51.6133755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb6fea979bfadd3%3A0x40864ca79df574a8!2sAlberdi%201118%20Depto%204%2C%20R%C3%ADo%20Gallegos%2C%20Santa%20Cruz!5e0!3m2!1ses-419!2sar!4v1654740207616!5m2!1ses-419!2sar"
                                    width="100%"
                                    height="150"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Map"
                                ></iframe>
                                <div className="contact-details">
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt contact-icon"></i>
                                        <div>
                                            <h4>Dirección:</h4>
                                            <p>Argentina, CABA</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-envelope contact-icon"></i>
                                        <div>
                                            <h4>Email:</h4>
                                            <p>administracion@vefrek.com</p>
                                        </div>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-phone contact-icon"></i>
                                        <div>
                                            <h4>Teléfono:</h4>
                                            <p>2966 15 23-1074</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-form">
                                <form ref={formRef}>
                                    <div className="form-row">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nombre"
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Asunto"
                                        required
                                    />
                                    <textarea
                                        name="message"
                                        rows="5"
                                        placeholder="Mensaje"
                                        required
                                    ></textarea>
                                    <button type="button" onClick={validateForm}>
                                        Enviar mensaje
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
