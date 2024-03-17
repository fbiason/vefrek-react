import React, { useState, useEffect, useContext, useRef } from "react";
import "./pagina-empresa.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import { findCompany, addReview } from "../../utils/apiDb/apiDbAcions";
import { swalPopUp, swalPopUpWithInputAndCb } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { reportCompany } from "../../utils/report";
import { UserContext } from "../../context/userContext";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Star } from "@mui/icons-material";

const PaginaEmpresa = () => {
    const [map, setMap] = useState(null);
    const companyDataRef = useRef();
    const { userData } = useContext(UserContext);
    const { showSpinner } = useContext(SpinnerContext);
    const navigate = useNavigate();
    const [stars, setStars] = useState();
    const [comments, setComments] = useState();

    const sendReport = async (reason) => {
        if (userData.isLogged === false) {
            swalPopUp(
                "Ops!",
                "Debes iniciar sesión para reportar una empresa",
                "warning"
            );
            return;
        }

        const reportData = {
            reportingUser: userData.email,
            reason: reason,
            reportedCompany: {
                id: companyDataRef.current._id,
                name: companyDataRef.current.name,
                date: new Date().toLocaleString(),
            },
        };
        showSpinner(true);
        const response = await reportCompany(reportData);
        if (response.success) {
            showSpinner(false);
            swalPopUp("Acción completada", response.message, "success");
        } else {
            showSpinner(false);
            swalPopUp("Ops!", response.message, "error");
        }
    };

    const report = async () => {
        swalPopUpWithInputAndCb(
            "Por favor, ingresa el motivo del reporte",
            "Debes ingresar un motivo para poder envíar el reporte",
            sendReport
        );
    };

    const getLocationFromAddress = async (address) => {
        try {
            const responseJSON = await fetch(
                `${process.env.REACT_APP_API_URL}api/getmap?address=${address}`, {
                    method: "GET",
                }
            );

            const responseOBJ = await responseJSON.json();
            if (responseOBJ.success) {
                setMap(
                    <iframe
                    title="map"
                    src={responseOBJ.url}
                    width="100%"
                    height={400}
                    style={{ borderRadius: '2rem', border: '1px solid #000' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                );
            } else {
                setMap(
                    <div className="googleMapFrame flex">
                        <p>No se pudo obtener la ubicación</p>
                    </div>
                );
            }

        } catch (error) {
            console.error("Error al obtener las coordenadas:", error);
        }
    };

    const { vefrek_website } = useParams();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [companyData, setCompanyData] = useState({
        name: "",
        slogan: "",
        location: "",
        phone: "",
        phone2: "",
        website: "",
        vefrek_website: "",
        category: "",
        subcategory: "",
        description: "",
        social: {
            whatsapp: "",
            instagram: "",
            facebook: "",
            x: "",
            linkedIn: "",
            tikTok: "",
            youtube: "",
            email: "",
        },
        images: {
            logo: {
                url: "",
            },
        },
        schedules: {
            scheduleType: "",
            personalized: {
                lunes: { open1: "", close1: "", open2: "", close2: "" },
                martes: { open1: "", close1: "", open2: "", close2: "" },
                miercoles: { open1: "", close1: "", open2: "", close2: "" },
                jueves: { open1: "", close1: "", open2: "", close2: "" },
                viernes: { open1: "", close1: "", open2: "", close2: "" },
                sabado: { open1: "", close1: "", open2: "", close2: "" },
                domingo: { open1: "", close1: "", open2: "", close2: "" },
            },
            custom: {
                open1: "",
                close1: "",
                open2: "",
                close2: "",
            }
        }
    });

    const find = async () => {
        showSpinner(true);
        const response = await findCompany("vefrek_website", vefrek_website, "-reviews.userEmail");
        if (response.success) {
            const companyData = response.companyData;
            const imagesUrlsArr = companyData.images.images.map(
                (imageData) => imageData.url
            );
            companyDataRef.current = companyData; //Datos para envio de reportes
            setImagenes(imagesUrlsArr);
            setCompanyData({
                name: companyData.name,
                slogan: companyData.slogan,
                location: companyData.location,
                city: companyData.city,
                state: companyData.state,
                phone: companyData.phone,
                phone2: companyData.phone2,
                website: companyData.website,
                vefrek_website: companyData.vefrek_website,
                category: "",
                subcategory: "",
                description: companyData.description,
                social: {
                    whatsapp: companyData.social.whatsapp,
                    instagram: companyData.social.instagram,
                    facebook: companyData.social.facebook,
                    x: companyData.social.x,
                    linkedIn: companyData.social.linkedIn,
                    tikTok: companyData.social.tikTok,
                    youtube: companyData.social.youtube,
                    email: companyData.social.email,
                },
                images: {
                    logo: {
                        url: companyData.images.logo.url,
                    },
                },
                schedule: {
                    opening: "",
                    closing: "",
                },
                creationdate: companyData.creationdate,
                schedules: companyData.schedules,
            });
                                                    
            if (!companyData.geo.googleMapUrl) {                                                                //Si la emnpresa no tiene datos de geolocalizacion los buscamos
                getLocationFromAddress(`${companyData.location},${companyData.city},${companyData.state}`);
            } else {
                setMap(
                    <iframe
                        title="map"
                        src={companyData.geo.googleMapUrl}
                        width="100%"
                        height={400}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                ); 
            }; 
                        
            /***************** Seteo calificaciones recibidas **********************/

            const reviewsArr = companyData.reviews;
            if (reviewsArr && reviewsArr.length > 0) {
                const reviewsAverage = reviewsArr.reduce((acc, review) => acc + review.numberOfStars, 0) / reviewsArr.length;
                setStars(
                    <div className="starsCont flex">
                        <p
                            className="starsNumbers"
                            title="Calificación promedio"
                        >{`${reviewsAverage.toFixed(1)}`}</p>
                        <div className="starsComponentCont flex">
                            <StyledRating
                                name="star-rating"
                                precision={0.1}
                                defaultValue={parseFloat(reviewsAverage.toFixed(1))}
                                icon={<Star />}
                                emptyIcon={<Star />}
                                readOnly
                            />
                        </div>
                        <p className="starsNumbers" title="Número de reseñas">
                            ({`${reviewsArr.length}`})
                        </p>
                    </div>
                );

                /***************** Seteo de comentarios **********************/

                const reviewsArrJSX = reviewsArr.map((review) =>
                    <div className="row container mt-5" key={review._id}>
                        <div className="col-6">
                            {" "}
                            <div className="commentsData flex">
                                <h5>{review.name}</h5>
                                <h5>({new Date(review.date).toLocaleString()})</h5>
                            </div>
                        </div>
                        <div className="text-end col-6">
                            {" "}
                            <h5>{"⭐⭐⭐⭐⭐".substring(0, review.numberOfStars)}</h5>{" "}
                        </div>
                        <div className="comentario-t">
                        <p>
                            {review.comment}
                        </p>
                        </div>
                    </div>
                )
                setComments(reviewsArrJSX);

            }

        } else if (!response.success) {
            swalPopUp("Ops", response.message, "warning");
            showSpinner(false);
            navigate("/");
        }
        showSpinner(false);
    };

    useEffect(() => {
        find();
        // eslint-disable-next-line
    }, [vefrek_website]);

    const intercambiarImagen = (index) => {
        const nuevasImagenes = [...imagenes];
        const temp = nuevasImagenes[0];
        nuevasImagenes[0] = nuevasImagenes[index];
        nuevasImagenes[index] = temp;
        setImagenes(nuevasImagenes);
    };

    /********************************* Reseñas **********************************/

    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
            color: "#FCD93A",
        },
        "& path": {
            stroke: "#000000", // Cambiar el color del contorno del ícono a negro
            strokeWidth: 0.5,
        },
        "& svg": {
            width: "30px", // Ajustar el ancho del icono SVG
            height: "30px", // Ajustar la altura del icono SVG
        },
    });

    const sendFeedback = async () => {
        try {
            if (!userData.isLogged)
                throw new Error("Debes iniciar sesión para enviar una reseña");

            const hasStars = document
                .querySelector(".starsFeedback")
                .querySelector("input[type='radio']:checked");
            const numberOfStars = hasStars
                ? parseInt(
                    document
                        .querySelector(".starsFeedback")
                        .querySelector("input[type='radio']:checked")
                        .getAttribute("weight")
                )
                : undefined;

            const companyId = companyDataRef.current._id;
            const comment = document.querySelector(".commentFeedback").value;
            showSpinner(true);
            const response = await addReview(numberOfStars, companyId, comment);
            if (response.success) {
                swalPopUp("Acción completada", response.message, "success");
                document.querySelector(".commentFeedback").value = "";
                document
                    .querySelector(".starsFeedback")
                    .querySelectorAll("input")
                    .forEach((input) => (input.checked = false));
            } else if (!response.success && !response.message.includes("Error")) {
                swalPopUp("Ops!", response.message, "warning");
            } else if (!response.success && response.message.includes("Error")) {
                swalPopUp("Ops!", response.message, "error");
            }
        } catch (err) {
            swalPopUp("Ops!", err.message, "error");
        }
        showSpinner(false);
        find();
    };

    useEffect(() => {
        
        (async () => {
            //Campo "timestamp" -> Es la ultima vez que se entro al anuncio
            const localStorageVisitsDataJSON = localStorage.getItem("companysVisits");
            const localStorageVisitsDataOBJ = localStorageVisitsDataJSON ? JSON.parse(localStorageVisitsDataJSON) : null;
            const companyArrIndex = localStorageVisitsDataOBJ ? localStorageVisitsDataOBJ.findIndex((companyData) => companyData.companyName === vefrek_website) : null;
            const timeStampsDiff = typeof companyArrIndex === "number" && companyArrIndex !== -1 ? Date.now() - localStorageVisitsDataOBJ[companyArrIndex].timestamp : null;

            if (!localStorageVisitsDataOBJ || !timeStampsDiff || timeStampsDiff > (60000 * 60)) { //Cuenta una visita si el tiempo entre entradas al anuncio es mayor a 1h      
                try {
                    const responseJSON = await fetch(
                        `${process.env.REACT_APP_API_URL}api/addvisit?vefrek_website=${vefrek_website}&timestamp=${Date.now()}`,
                        {
                            method: "POST",
                        }
                    )
                    const respOBJ = await responseJSON.json();
                    if (respOBJ.success) {
                        console.log(respOBJ.message);
                        if (!localStorageVisitsDataOBJ) {
                            localStorage.setItem("companysVisits", JSON.stringify([{companyName: vefrek_website, timestamp: Date.now()}]));
                            return;
                        } else if (!timeStampsDiff) {
                            localStorageVisitsDataOBJ.push({companyName: vefrek_website, timestamp: Date.now()});
                        } else {
                            localStorageVisitsDataOBJ[companyArrIndex].timestamp = Date.now();   
                        }
                        localStorage.setItem("companysVisits", JSON.stringify(localStorageVisitsDataOBJ));
                    } else {
                        throw new Error(`${respOBJ.message}`);
                    }
                } catch (err) {
                    err instanceof Error ?
                        console.log(`Error al agregar visita: ${err.message}`) :
                        console.log(`Error al agregar visita: Error desconocido`);
                }
            }
        })();
         
    }, [vefrek_website])
    
    const setScheduleType = () => {
        if (companyData.schedules) {
            switch (companyData.schedules.scheduleType) {
                case "P":
                    return "";
                case "LaV":
                    return "Lunes a Viernes";
                case "LaS":
                    return "Lunes a Sábado";
                case "LaD":
                    return "Lunes a Domingo";
                default:
                    return "";
            }
        } else {
            return "";
        }        
    }

    return (
        <section className="background-empresa overflow-x-hidden">
            <div className="p-3">
                <div className="row">
                    {/* Columna 1 - Imágenes de la empresa */}
                    <div className=" col-md-8 col-sm-6">
                        {/* Fila 1 */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="perfil-card-element1 card-empresa">
                                    <div className="row logo-nombre-container">
                                        <div className="logo-container col-lg-2 text-center">
                                            <img
                                                src={companyData.images.logo.url}
                                                alt="Logo de la empresa"
                                                className="logo-empresa img-fluid"
                                            />
                                        </div>
                                        <div className="nombre-slogan-container col-lg-10">
                                            <h2>{companyData.name}</h2>
                                            {stars}
                                            <p>{companyData.slogan}</p>
                                        </div>
                                        <div className="mt-4 text-left">
                                            <p>Fecha de Carga: {new Date(companyData.creationdate).toLocaleString().split(",")[0]}</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 img-negocio">
                                        <div className="col-md-12 col-sm-6">
                                            <div className="image-container">
                                                <img
                                                    className={`img-fluid cursor-pointer ${imagenSeleccionada === 0
                                                        ? "imagen-seleccionada"
                                                        : ""
                                                        }`}
                                                    src={imagenes[0]}
                                                    alt=""
                                                    onClick={() => {
                                                        setImagenSeleccionada(0);
                                                        intercambiarImagen(0);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-4 col-md-12 col-sm-6 ">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <div key={index}>
                                                    <img
                                                        className={`h-72 w-128 cursor-pointer ${imagenSeleccionada === index + 1
                                                            ? "imagen-seleccionada"
                                                            : ""
                                                            } img-fluid`}
                                                        src={imagenes[index + 1]}
                                                        alt=""
                                                        onClick={() => {
                                                            setImagenSeleccionada(index + 1);
                                                            intercambiarImagen(index + 1);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fila 2 */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="perfil-card-element1 card-empresa">
                                    <div className="informacion-container text-left">
                                        <h2>Información</h2>
                                        <p>{companyData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fila 3 */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="perfil-card-element1 mt-3 card-empresa ">
                                    <div className="reseña-container text-left">
                                        <h2>Opiniones Destacadas</h2>
                                  
                                        {comments}
                                        <div class="container">
                                            <a href="/">ver más comentarios...</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          
                    {/* Columna 2 - Ubicación y Redes Sociales */}
                    <div className="negocio-2 col-md-4 col-sm-12 flex-column">
                        <div className="perfil-card-element2 card-empresa h-100">
                            <div className="column-2 flex-grow-1">
                                <div className="ubicacion-container">{map}</div>

                                <div className="mt-3 data-neg">
                                    <p>{`Direccion: ${companyData.location},  ${companyData.city}, ${companyData.state},`}</p>
                                </div>
                                <div className="data-neg">
                                <a
                                    className="telefono-container"
                                    href={`tel:${companyData.phone.replace(/[\s-]/g, "")}`}
                                >
                                    <p>{`Teléfono: ${companyData.phone}`}</p>
                                </a>
                                </div>
                                <div className="redes-sociales-container d-flex justify-content-start">
                                    {" "}
                                    {companyData.social.whatsapp && (
                                        <a
                                            href={
                                                companyData.social.whatsapp.includes("http")
                                                    ? companyData.social.whatsapp
                                                    : `https://wa.me/${companyData.social.whatsapp.replace(
                                                        /[\s-]/g,
                                                        ""
                                                    )}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-whatsapp"></i>
                                        </a>
                                    )}
                                    {companyData.social.facebook && (
                                        <a
                                            href={
                                                companyData.social.facebook.includes("http")
                                                    ? companyData.social.facebook
                                                    : `https://${companyData.social.facebook}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    )}
                                    {companyData.social.x && (
                                        <a
                                            href={
                                                companyData.social.x.includes("http")
                                                    ? companyData.social.x
                                                    : `https://${companyData.social.x}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-x"></i>
                                        </a>
                                    )}
                                    {companyData.social.youtube && (
                                        <a
                                            href={
                                                companyData.social.youtube.includes("http")
                                                    ? companyData.social.youtube
                                                    : `https://${companyData.social.youtube}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    )}
                                    {companyData.social.linkedIn && (
                                        <a
                                            href={
                                                companyData.social.linkedIn.includes("http")
                                                    ? companyData.social.linkedIn
                                                    : `https://${companyData.social.linkedIn}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                    )}
                                    {companyData.social.instagram && (
                                        <a
                                            href={
                                                companyData.social.instagram.includes("http")
                                                    ? companyData.social.instagram
                                                    : `https://${companyData.social.instagram}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    )}
                                </div>
                                <div className="mt-3 data-neg">
                                    {" "}
                                    <a
                                        className="sitio-web-container"
                                        href={
                                            companyData.website.includes("http")
                                                ? companyData.website
                                                : `https://${companyData.website}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <p>{`Sitio Web: ${companyData.website}`}</p>
                                    </a>
                                </div>

                                <div>
                                    <table className="opening-hours table table-hover table-condensed borderless">
                                        <thead>
                                            <tr>
                                                <th colSpan="2" className="table-headline">
                                                    <span style={{ fontSize: "18px" }}>
                                                        Horario:  {
                                                           setScheduleType(companyData.schedules ? companyData.schedules.scheduleType : null)
                                                        }
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        
                                        {   
                                            companyData.schedules && companyData.schedules.scheduleType === "P" &&              
                                            <tbody>
                                                {
                                                    ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => {
                                                        const dayNormalized = 
                                                            day.normalize("NFD")                                           //Saca acentos y pasa a minuscula
                                                            .replace(/[\u0300-\u036f]/g, "")
                                                            .toLocaleLowerCase()
                                                        return (
                                                            <tr key={day}>
                                                                <th>{day}</th>
                                                                {
                                                                    companyData.schedules.personalized[dayNormalized].open1 && companyData.schedules.personalized[dayNormalized].close1 ?   
                                                                    <>
                                                                        <td>{companyData.schedules.personalized[dayNormalized].open1} - {companyData.schedules.personalized[dayNormalized].close1}</td>
                                                                        <td>{companyData.schedules.personalized[dayNormalized].open2} - {companyData.schedules.personalized[dayNormalized].close2}</td>
                                                                    </> :
                                                                    <>
                                                                        <td>Cerrado</td>
                                                                        <td></td>
                                                                    </>
                                                                }      

                                                            </tr>
                                                        )
                                                    })
                                                }                                                              
                                            </tbody>
                                        }

                                        {   
                                            (
                                                companyData.schedules && 
                                                (
                                                    companyData.schedules.scheduleType === "LaV" || 
                                                    companyData.schedules.scheduleType === "LaS" ||   
                                                    companyData.schedules.scheduleType === "LaD" 
                                                )
                                            )
                                            &&          
                                            <tbody>
                                                <tr>
                                                    <td>{companyData.schedules.custom.open1} - {companyData.schedules.custom.close1}</td>
                                                    { companyData.schedules.custom.open2 && <td>{companyData.schedules.custom.open2} - {companyData.schedules.custom.close2}</td>}
                                                </tr>
                                            </tbody>
                                        }

                                    </table>
                                </div>

                                <div className="mt-3" onClick={report}>
                                    <button className="reportar">Reportar Negocio</button>
                                </div>

                                <div className="max-w-lg shadow-md mt-4">
                                    <form action="" className="w-full p-2">
                                        <div className="mb-2">
                                            <label htmlFor="comment" className="text-gray-600 w-full">
                                                Deja tu comentario sobre la empresa
                                            </label>
                                            <textarea
                                                className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 commentFeedback"
                                                name="comment"
                                                placeholder=""
                                            ></textarea>
                                        </div>

                                        <div className="container d-flex justify-content-center align-items-center p-3 r-star">
                                            <div className="feedback">
                                                <div className="rating starsFeedback">
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        id="rating-5"
                                                        weight="5"
                                                    />
                                                    <label htmlFor="rating-5"></label>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        id="rating-4"
                                                        weight="4"
                                                    />
                                                    <label htmlFor="rating-4"></label>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        id="rating-3"
                                                        weight="3"
                                                    />
                                                    <label htmlFor="rating-3"></label>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        id="rating-2"
                                                        weight="2"
                                                    />
                                                    <label htmlFor="rating-2"></label>
                                                    <input
                                                        type="radio"
                                                        name="rating"
                                                        id="rating-1"
                                                        weight="1"
                                                    />
                                                    <label htmlFor="rating-1"></label>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                                            onClick={sendFeedback}
                                            type="button"
                                        >
                                            Comentar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaginaEmpresa;