import React, { useState, useEffect, useContext, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  findCompany,
  addReview,
  findUser,
  editUserByQuery,
  handleFavorite,
} from "../utils/apiDb/apiDbAcions";
import {
  swalPopUp,
  swalPopUpWithInputAndCb,
  swalPopUpSuccessTemporal,
} from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";
import { reportCompany } from "../utils/report";
import { UserContext } from "../context/userContext";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Star, Edit } from "@mui/icons-material";
import Slider from "react-slick";
import { BsStarFill } from "react-icons/bs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Flechas
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      <BsChevronRight style={{ fontSize: "24px", color: "#333" }} />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
      <BsChevronLeft style={{ fontSize: "24px", color: "#333" }} />
    </div>
  );
};

const PaginaEmpresa = () => {
  const [map, setMap] = useState(null);
  const companyDataRef = useRef();
  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const navigate = useNavigate();
  const [stars, setStars] = useState();
  const [comments, setComments] = useState();
  const heartRef = useRef();

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
        `${process.env.REACT_APP_API_URL}api/getmap?address=${address}`,
        {
          method: "GET",
        }
      );

      const responseOBJ = await responseJSON.json();
      if (responseOBJ.success) {
        setMap(
          <iframe
            className="mapa-google"
            title="map"
            src={responseOBJ.url}
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
      },
    },
  });

  const find = async () => {
    showSpinner(true);
    const response = await findCompany(
      "vefrek_website",
      vefrek_website,
      "-reviews.userEmail"
    );
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

      if (!companyData.geo.googleMapUrl) {
        //Si la empresa no tiene datos de geolocalizacion los buscamos
        getLocationFromAddress(
          `${companyData.location},${companyData.city},${companyData.state}`
        );
      } else {
        setMap(
          <iframe
            title="map"
            src={companyData.geo.googleMapUrl}
            width="100%"
            height={400}
            style={{ border: 0, borderRadius: "10%" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        );
      }

      /***************** Seteo calificaciones recibidas **********************/

      const reviewsArr = companyData.reviews;
      if (reviewsArr && reviewsArr.length > 0) {
        const reviewsAverage =
          reviewsArr.reduce((acc, review) => acc + review.numberOfStars, 0) /
          reviewsArr.length;
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

        const reviewsArrJSX = reviewsArr.map((review) => (
          <div className="row mt-3" key={review._id}>
            <div>
              <div className="commentsData">
                <h5>{review.name}</h5>
                <h5>({new Date(review.date).toLocaleString()})</h5>
              </div>
            </div>
            <div className="nro-star">
              <h5>{"⭐⭐⭐⭐⭐".substring(0, review.numberOfStars)}</h5>
            </div>
            <div className="comentario-t">
              <p>{review.comment}</p>
            </div>
          </div>
        ));
        setComments(reviewsArrJSX);
      }
    } else if (!response.success) {
      swalPopUp("Ops", response.message, "warning");
      showSpinner(false);
      navigate("/");
    }
    showSpinner(false);
    return response;
  };

  useEffect(() => {
    const loadData = async () => {
      const companyDataResponse = await find();
      if (userData.isLogged && companyDataResponse.success) {
        const { companyData } = companyDataResponse;

        /***************** Lectura y escritura de datos de sitios vistados en la informacion de usuario en la base de datos **********************/

        const userDataResponse = await findUser(
          "email",
          userData.email,
          "visited email"
        );
        const userDataFromDB = userDataResponse.userData;
        if (userDataResponse.success) {
          const userVisitedCompanysDataArr = userDataFromDB.visited;
          const companyToFind = userVisitedCompanysDataArr.find(
            (company) => company.companyid === companyData._id
          );
          if (companyToFind) {
            const response = await editUserByQuery(
              {
                email: userDataFromDB.email,
                "visited.companyid": companyData._id,
              },
              {
                $set: {
                  "visited.$.visitscount": companyToFind.visitscount + 1,
                  "visited.$.lastvisit": Date.now(),
                },
              }
            );
            if (!response.success) console.error(response.message);
          } else {
            const companyVisitedNewData = {
              companyid: companyData._id,
              visitscount: 1,
              lastvisit: Date.now(),
            };
            const response = await editUserByQuery(
              { email: userDataFromDB.email },
              { $push: { visited: companyVisitedNewData } }
            );
            if (!response.success) console.error(response.message);
          }
        } else {
          console.error(userDataResponse.message);
        }
      }
    };

    loadData();
    // eslint-disable-next-line
  }, [vefrek_website, userData.isLogged]);

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
      stroke: "#000000",
      strokeWidth: 0.5,
    },
    "& svg": {
      width: "30px",
      height: "30px",
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
      const localStorageVisitsDataJSON = localStorage.getItem("companysVisits");
      const localStorageVisitsDataOBJ = localStorageVisitsDataJSON
        ? JSON.parse(localStorageVisitsDataJSON)
        : null;
      const companyArrIndex = localStorageVisitsDataOBJ
        ? localStorageVisitsDataOBJ.findIndex(
            (companyData) => companyData.companyName === vefrek_website
          )
        : null;
      const timeStampsDiff =
        typeof companyArrIndex === "number" && companyArrIndex !== -1
          ? Date.now() - localStorageVisitsDataOBJ[companyArrIndex].timestamp
          : null;

      if (
        !localStorageVisitsDataOBJ ||
        !timeStampsDiff ||
        timeStampsDiff > 60000 * 60
      ) {
        try {
          const responseJSON = await fetch(
            `${
              process.env.REACT_APP_API_URL
            }api/addvisit?vefrek_website=${vefrek_website}&timestamp=${Date.now()}`,
            {
              method: "POST",
            }
          );
          const respOBJ = await responseJSON.json();
          if (respOBJ.success) {
            if (!localStorageVisitsDataOBJ) {
              localStorage.setItem(
                "companysVisits",
                JSON.stringify([
                  { companyName: vefrek_website, timestamp: Date.now() },
                ])
              );
              return;
            } else if (!timeStampsDiff) {
              localStorageVisitsDataOBJ.push({
                companyName: vefrek_website,
                timestamp: Date.now(),
              });
            } else {
              localStorageVisitsDataOBJ[companyArrIndex].timestamp = Date.now();
            }
            localStorage.setItem(
              "companysVisits",
              JSON.stringify(localStorageVisitsDataOBJ)
            );
          } else {
            throw new Error(`${respOBJ.message}`);
          }
        } catch (err) {
          err instanceof Error
            ? console.log(`Error al agregar visita: ${err.message}`)
            : console.log(`Error al agregar visita: Error desconocido`);
        }
      }
    })();
  }, [vefrek_website]);

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
  };

  const handleFavorites = async () => {
    if (heartRef.current.checked === false) {
      showSpinner(true);
      const response = await handleFavorite(
        companyDataRef.current._id,
        userData.email,
        "add"
      );
      if (response.success) {
        swalPopUpSuccessTemporal("Favorito Agregado");
        heartRef.current.checked = true;
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    } else {
      showSpinner(true);
      const response = await handleFavorite(
        companyDataRef.current._id,
        userData.email,
        "sus"
      );
      if (response.success) {
        swalPopUpSuccessTemporal("Favorito Eliminado");
        heartRef.current.checked = false;
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    }
  };

  useEffect(() => {
    if (userData.isLogged && companyDataRef.current) {
      if (
        companyDataRef.current.favorites &&
        companyDataRef.current.favorites.length > 0
      ) {
        const favoritesArr = companyDataRef.current.favorites;
        if (favoritesArr.includes(userData.email)) {
          if (heartRef.current) {
            heartRef.current.checked = true;
          }
        }
      }
    }
  }, [userData.isLogged, companyDataRef.current]);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };
  
  return (
    <section className="contenedor-principal background">
      {/* Columna A */}
      <div className="columnaA">
        {/* Fila 1: Logo, nombre y carrusel */}
        <div className="fila fila-logo-carrusel">
          {/* Contenedor del logo y el nombre */}
          <div className="logo-nombre-contenedor">
            {/* Logo de la empresa */}
            <div className="logo-empresa">
              <img
                src={companyData.images.logo.url}
                alt="Logo de la empresa"
                className="logo-empresa-img"
              />
            </div>

            {/* Nombre y slogan de la empresa */}
            <div className="empresa-nombre-slogan">
              <div className="empresa-nombre-fav"></div>
              <h2 className="empresa-nombre">{companyData.name}</h2>
              <p className="empresa-slogan">{companyData.slogan}</p>
              <label
                className="businessCard-favoriteLabel"
                onClick={handleFavorites}
              >
                <BsStarFill className="businessCard-starIcon" />
              </label>
            </div>
          </div>

          {/* Carrusel de imágenes */}
          <div className="carrusel-imagenes">
            <Slider {...settings}>
              {imagenes.map((imagen, index) => (
                <div key={index}>
                  <img
                    className={`carrusel-img ${
                      imagenSeleccionada === index ? "imagen-seleccionada" : ""
                    }`}
                    src={imagen}
                    alt={`Imagen ${index + 1} de la empresa`}
                    onClick={() => {
                      setImagenSeleccionada(index);
                      intercambiarImagen(index);
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Fila 2: Información sobre la empresa */}
        <div className="fila fila-informacion">
          <h2 className="informacion-titulo">Información</h2>
          <p className="informacion-descripcion">
            {companyData.description
              ? companyData.description
              : "Descripción no disponible."}
          </p>
        </div>

        {/* Fila 3: Opiniones Destacadas */}
        <div className="fila fila-opiniones">
          <div className="opiniones-header">
            <h2 className="opiniones-titulo">Opiniones Destacadas</h2>
            <button className="btn-icon">
              <Edit />
            </button>
          </div>

          <div className="opiniones-lista">
            {comments && comments.length > 0 ? (
              comments
            ) : (
              <p className="opiniones-no-disponibles">
                No hay opiniones disponibles.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Columna B: Ubicación y datos de la empresa */}
      <div className="columnaB">
        {/* Ubicación (mapa) */}
        <div className="ubicacion-container">
          {map ? map : <p>No se pudo cargar la ubicación.</p>}
        </div>

        {/* Dirección */}
        <div className="datos-direccion">
          <p>
            <strong>Dirección:</strong> {companyData.location},{" "}
            {companyData.city}, {companyData.state}
          </p>
        </div>

        {/* Teléfono */}
        <div className="datos-telefono">
          <p>
            <strong>Teléfono:</strong>
            <a href={`tel:${companyData.phone.replace(/[\s-]/g, "")}`}>
              {companyData.phone}
            </a>
          </p>
          {companyData.phone2 && (
            <p>
              <strong>Teléfono 2:</strong>
              <a href={`tel:${companyData.phone2.replace(/[\s-]/g, "")}`}>
                {companyData.phone2}
              </a>
            </p>
          )}
        </div>

        {/* Redes sociales */}
        <div className="redes-sociales-container">
          {companyData.social.whatsapp && (
            <a
              href={`https://wa.me/${companyData.social.whatsapp.replace(
                /[\s-]/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          )}
          {companyData.social.facebook && (
            <a
              href={`https://${companyData.social.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          )}
          {companyData.social.instagram && (
            <a
              href={`https://${companyData.social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          )}
          {companyData.social.linkedIn && (
            <a
              href={`https://${companyData.social.linkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {companyData.social.youtube && (
            <a
              href={`https://${companyData.social.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          )}
        </div>

        {/* Sitio web */}
        <div className="datos-sitio-web">
          {companyData.website && (
            <p>
              <strong>Sitio Web:</strong>
              <a
                href={
                  companyData.website.includes("http")
                    ? companyData.website
                    : `https://${companyData.website}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {companyData.website}
              </a>
            </p>
          )}
        </div>

        {/* Horario */}
        <div className="datos-horario">
          <h3>Horario de atención</h3>
          {companyData.schedules && companyData.schedules.personalized ? (
            <table className="horario-table">
              <thead>
                <tr>
                  <th>Día</th>
                  <th>Horarios</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(companyData.schedules.personalized).map((day) => {
                  const schedule = companyData.schedules.personalized[day];
                  return (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>
                        {schedule.open1
                          ? `${schedule.open1} - ${schedule.close1}`
                          : "Cerrado"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No hay horario disponible.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaginaEmpresa;