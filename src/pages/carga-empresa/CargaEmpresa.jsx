import React, { useState, useRef, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import { addCompany } from "../../utils/apiDb/apiDbAcions";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import localidadesData from "./localidades.json";
import "./CargaEdicionEmpresa.css";

const CargaEmpresa = () => {
  const { userData } = useContext(UserContext);
  const formRef = useRef();
  const { showSpinner } = useContext(SpinnerContext);
  const [formData, setFormData] = useState({
    name: "",
    slogan: "",
    location: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    phone2: "",
    website: "",
    vefrek_website: "",
    category: "",
    closing: "",
    social: {
      email: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      x: "",
      linkedin: "",
      tiktok: "",
      youtube: "",
    },
    description: "",
    email_notifications: {
      comments: false,
      news: false,
    },
    sms_notifications: {
      all: false,
      same_email: false,
      none: true,
    },
    logo_image_name: "",
    images_names: "",
    schedules: {
      scheduleType: "LaV",
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
  // Inico API
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");

  // Obtener la lista de provincias a partir de localidadesData
  const provinciasList = [
    ...new Set(
      localidadesData.localidades.map((localidad) => localidad.provincia.nombre)
    ),
  ];

  const handleProvinciaChange = (e) => {
    const selectedProvincia = e.target.value;
    setSelectedProvincia(selectedProvincia);
    // Obtener la lista de ciudades para la provincia seleccionada
    const ciudadesList = localidadesData.localidades
      .filter((localidad) => localidad.provincia.nombre === selectedProvincia)
      .map((localidad) => localidad.nombre);
    setCiudades(ciudadesList);

    setFormData({
      ...formData,
      state: e.target.value,
    });
  };

  // Fin Api

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0] ? files[0].name : "",
    });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      social: {
        ...formData.social,
        [name]: value,
      },
    });
  };

  const handleFilesChange = (e) => {
    const { files } = e.target;
    if (files[0]) {
      const filesArr = Array.from(files); //Files es del tipo "Filelist" y no soporta el metodo "map"
      const filesArrNames = filesArr.map((file) => (
        <p className="company_images_names">{file.name}</p>
      ));
      setFormData({
        ...formData,
        ...{ images_names: filesArrNames },
      });
    }
  };

  const loadFile = (e) => {
    e.target.nextSibling.click();
  };

  const selectImages = (e) => {
    const inputFiles = e.target.querySelector(".company_images_files");
    if (inputFiles) inputFiles.click();
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const categoryValue = value.split(",")[0].trim();
    const subcategoryValue = value.split(",")[1].trim();
    setFormData({
      ...formData,
      ...{
        category: categoryValue,
        subcategory: subcategoryValue,
      },
    });
  };

  useEffect(() => {
    formRef.current = formData;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formRef.current.registeremail = userData.email;

    if (formRef.current.schedules.scheduleType === "P") {
      //Si cargamos horarios personalizados ponemos el campo "custom" en null para no cargar informacion innecesaria
      formRef.current = {
        ...formRef.current,
        schedules: {
          ...formRef.current.schedules,
          custom: null,
        },
      };
    } else {
      //Si cargamos horarios "LaV" "LaS" o "LaD" ponemos el campo "personalized" en null para no cargar informacion innecesaria
      formRef.current = {
        ...formRef.current,
        schedules: {
          ...formRef.current.schedules,
          personalized: null,
        },
      };
    }

    const companyData = formRef.current;
    const completeData = new FormData();
    completeData.append("companyTextData", JSON.stringify(companyData));
    const lofoFile = document.querySelector(".company_logo_file").files[0];
    completeData.append("logo", lofoFile);
    const files = document.querySelector(".company_images_files").files;
    for (const file of files) {
      completeData.append("images", file);
    }
    showSpinner(true);
    const response = await addCompany(completeData);
    response.success
      ? swalPopUp("Tarea completada", response.message, "success")
      : swalPopUp("Error", response.message, "error");
    showSpinner(false);
  };

  /*************************** Horarios  ****************************/

  const [hDef, setHDef] = useState(true);

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const generarHorarios = () => {
    const horarios = [];
    for (let hora = 0; hora < 24; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 15) {
        const horaString = hora.toString().padStart(2, "0");
        const minutoString = minuto.toString().padStart(2, "0");
        horarios.push(`${horaString}:${minutoString}`);
      }
    }
    return horarios;
  };

  const setTipoHorarios = (e) => {
    //Tipo de horarios: LaV", "LaS", "LaD", "P"
    const valueSelected = e.target.value;
    setFormData((actualFormData) => ({
      ...actualFormData,
      schedules: {
        ...actualFormData.schedules,
        scheduleType: valueSelected,
      },
    }));
    valueSelected === "P" ? setHDef(false) : setHDef(true);
  };

  const handleInputChangeDef = (turno, e) => {
    //Cambio de horarios entre: "open1" "close1" "open2" "close2"
    const hour = e.target.value;
    setFormData((actualFormData) => ({
      ...actualFormData,
      schedules: {
        ...actualFormData.schedules,
        custom: {
          ...actualFormData.schedules.custom,
          [turno]: hour,
        },
      },
    }));
  };

  const handleInputChange = (dia, turno, e) => {
    //Cambio de horarios entre: "open1" "close1" "open2" "close2"
    const hour = e.target.value;
    setFormData((actualFormData) => ({
      ...actualFormData,
      schedules: {
        ...actualFormData.schedules,
        personalized: {
          ...actualFormData.schedules.personalized,
          [dia]: {
            ...actualFormData.schedules.personalized[dia],
            [turno]: hour,
          },
        },
      },
    }));
  };

  const horarioPersJSX = //Horarios personalizados (Se puede elegir un horario diferente por cada dia de la semana)
    (
      <div className="flex">
        <div className="flex column">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Apertura</th>
                <th>Cierre</th>
              </tr>
            </thead>
            <tbody>
              {diasSemana.map((dia) => {
                dia = dia
                  .normalize("NFD") //Saca acentos y pasa a minuscula
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLocaleLowerCase();
                return (
                  <>
                    <tr key={dia}>
                      <td className="horariosDias">{dia}</td>
                      <td>
                        <select
                          value={formData.schedules.personalized[dia].open1}
                          defaultValue=""
                          onChange={(e) => handleInputChange(dia, "open1", e)}
                        >
                          <option value=""></option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={formData.schedules.personalized[dia].close1}
                          defaultValue=""
                          onChange={(e) => handleInputChange(dia, "close1", e)}
                        >
                          <option value=""></option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr key={dia}>
                      <td className="horariosDias bottomCells"></td>
                      <td className="bottomCells">
                        <select
                          value={formData.schedules.personalized[dia].open2}
                          defaultValue=""
                          onChange={(e) => handleInputChange(dia, "open2", e)}
                        >
                          <option value=""></option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="bottomCells">
                        <select
                          value={formData.schedules.personalized[dia].close2}
                          defaultValue=""
                          onChange={(e) => handleInputChange(dia, "close2", e)}
                        >
                          <option value=""></option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );

  const horarioDefJSX = //Horarios Definidos para "Lunes a Viernes" "Lunes a Sabado" o "Todos lods dias"
    (
      <div className="flex">
        <div className="flex column">
          <table>
            <thead>
              <tr>
                <th>Apertura</th>
                <th>Cierre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    value={formData.schedules.custom.open1}
                    defaultValue=""
                    onChange={(e) => handleInputChangeDef("open1", e)}
                  >
                    <option value=""></option>
                    {generarHorarios().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={formData.schedules.custom.close1}
                    defaultValue=""
                    onChange={(e) => handleInputChangeDef("close1", e)}
                  >
                    <option value=""></option>
                    {generarHorarios().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    value={formData.schedules.custom.open2}
                    defaultValue=""
                    onChange={(e) => handleInputChangeDef("open2", e)}
                  >
                    <option value=""></option>
                    {generarHorarios().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={formData.schedules.custom.close2}
                    defaultValue=""
                    onChange={(e) => handleInputChangeDef("close2", e)}
                  >
                    <option value=""></option>
                    {generarHorarios().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  /**********************************************************************************/

  return (
    <section className="bgCargaEdicion">
      <div>
        <form className="formCarga" onSubmit={handleSubmit}>
          <div>
            <h1>Carga de negocio</h1>
            <p className="mt-5">
              Si es propietario de un negocio referido al rubro automotor puede
              cargarlo <b>GRATIS</b> en nuestro sitio web.
            </p>

            <div className="datosForm">
              {/* Nombre Empresa*/}
              <div className="campos camposS3">
                <label htmlFor="first-name">
                  <i className="obligatorio">* </i>Nombre de Empresa
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              {/* Sologan Empresa*/}
              <div className="campos camposS3">
                <label htmlFor="slogan">Slogan (opcional)</label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.slogan}
                    type="text"
                    name="slogan"
                    id="slogan"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              {/* CUIT*/}
              <div className="campos camposS2">
                <label htmlFor="postal-code">CUIT</label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.postal_code}
                    type="text"
                    name="postal_code"
                    id="postal-code"
                    autoComplete="postal-code"
                  />
                </div>
              </div>
              {/* Dirección*/}
              <div className="campos camposS4">
                <label htmlFor="street-address">
                  <i className="obligatorio">* </i>Dirección
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.location}
                    type="text"
                    name="location"
                    id="street-address"
                    autoComplete="street-address"
                  />
                </div>
              </div>{" "}
              {/* PROVINCIAS*/}
              <div className="campos camposS2">
                <label htmlFor="region">
                  <i className="obligatorio">* </i>Provincia
                </label>

                <div className="mt-2">
                  <select
                    id="selectProvincias"
                    onChange={handleProvinciaChange}
                    value={selectedProvincia}
                    name="state"
                  >
                    <option value="">Selecciona una provincia</option>
                    {provinciasList.map((provincia, index) => (
                      <option key={index} value={provincia}>
                        {provincia}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* CIUDAD*/}
              <div className="campos camposS2">
                <label htmlFor="city">
                  <i className="obligatorio">* </i>Ciudad
                </label>
                <div className="mt-2">
                  <select
                    id="selectCiudades"
                    name="city"
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {ciudades.map((ciudad, index) => (
                      <option key={index} value={ciudad}>
                        {ciudad}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* CP*/}
              <div className="campos camposS2">
                <label htmlFor="postal-code">
                  <i className="obligatorio">* </i>Código Postal
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.postal_code}
                    type="text"
                    name="postal_code"
                    id="postal-code"
                    autoComplete="postal-code"
                  />
                </div>
              </div>
              {/* tel*/}
              <div className="campos camposS3">
                <label htmlFor="phone">
                  <i className="obligatorio">* </i>Teléfono
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.phone}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              {/* tel2*/}
              <div className="campos camposS3">
                <label htmlFor="phone2">Teléfono Alternativo (opcional)</label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.phone2}
                    type="text"
                    name="phone2"
                    id="phone2"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              {/* web*/}
              <div className="campos camposS3">
                <label htmlFor="website">Sitio Web (opcional):</label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.website}
                    type="text"
                    name="website"
                    id="website"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              {/* categoria*/}
              <div className="campos camposS3">
                <div>
                  <label>
                    <i className="obligatorio">* </i>Categoría:{" "}
                  </label>
                  <select
                    name="category"
                    onChange={handleCategoryChange}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      <span>Selecciona una categoría</span>
                    </option>
                    <option disabled style={{ color: "darkgray" }}>
                      - Reparación y Mantenimiento
                    </option>
                    <option value="Reparación y mantenimiento, Gomería">
                      -- Gomerías (arreglo y venta de cubiertas, alineación y
                      balanceo)
                    </option>
                    <option value="Reparación y mantenimiento, Taller mecánico">
                      -- Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                    </option>
                    <option value="Reparación y mantenimiento, Repuestos">
                      -- Repuestos (Autopartes)
                    </option>
                    <option value="Reparación y mantenimiento, Lubricentro">
                      -- Lubricentros
                    </option>
                    <option
                      disabled
                      style={{ color: "darkgray" }}
                      value="venta_alquiler"
                    >
                      - Venta y Alquiler de vehículos
                    </option>
                    <option value="Venta y alquiler de vehículos, Agencia">
                      -- Agencia (Concesionaria oficiales y Agencias
                      particulares)
                    </option>
                    <option value="Venta y alquiler de vehículos, Rent a Car">
                      -- Rent a Car (Alquiler de autos)
                    </option>
                    <option
                      disabled
                      style={{ color: "darkgray" }}
                      value="otros_servicios"
                    >
                      - Otros Servicios
                    </option>
                    <option value="Otros servicios, Aseguradora">
                      -- Aseguradoras
                    </option>
                    <option value="Otros servicios, Estación de Servicio">
                      -- Estaciones de Servicios
                    </option>
                    <option value="Otros servicios, Estética del automotor">
                      -- Estética del Automotor (Lavaderos, Polarizados)
                    </option>
                    <option value="Otros servicios, Servicios de Emergencia">
                      -- Servicios de emergencia (Grúas, Cerrajeros)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="linea-divisoria mt-5"></div>
          {/*horarios*/}
          <div className="horarios-cont flex column">
            <label className="horariosTitle">
              <i className="obligatorio">* </i>Horarios:{" "}
            </label>
            <select
              defaultValue="LaV"
              className="horariosOption"
              onChange={setTipoHorarios}
            >
              <option value="LaV">Lunes a Viernes</option>
              <option value="LaS">Lunes a Sábado</option>
              <option value="LaD">Todos los días</option>
              <option value="P">Personalizar</option>
            </select>
            {hDef && horarioDefJSX}
            {!hDef && horarioPersJSX}
          </div>

          <div className="linea-divisoria"></div>

          <div className="campos2">
            {/*url*/}
            <div className="campos2S6">
              <label htmlFor="username">
                <i className="obligatorio">* </i>Ingrese la URL de su sitio web
                comercial:
              </label>
              <div>
                <div className="url-vfk">
                  <span>vefrek.com/</span>
                  <input
                    value={formData.vefrek_website}
                    onChange={handleChange}
                    type="text"
                    name="vefrek_website"
                    id="username"
                    autoComplete="username"
                    placeholder="nombre-negocio"
                  />
                </div>
              </div>
            </div>
            {/*descripcion*/}
            <div className="campos2S6">
              <label htmlFor="about">
                <i className="obligatorio">* </i>Descripción
              </label>
              <div className="mt-2">
                <textarea
                  value={formData.description}
                  onChange={handleChange}
                  id="about"
                  name="description"
                  rows={3}
                  className="txt-form"
                  defaultValue={""}
                  placeholder=" Describa brevemente su empresa."
                />
              </div>
            </div>
            {/*rrss*/}
            <div className="camposRedes camposSfull">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="social">
                      <label>
                        <i className="fab fa-whatsapp me-2"></i>
                        <span className="obligatorio">*</span>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="whatsapp"
                        value={formData.social.whatsapp}
                        className="form-control"
                        placeholder="WhatsApp"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fas fa-envelope me-2"></i>
                        <span className="obligatorio">*</span>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="email"
                        value={formData.social.email}
                        className="form-control"
                        placeholder="Mail"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fab fa-facebook me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="facebook"
                        value={formData.social.facebook}
                        className="form-control"
                        placeholder="Facebook"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fab fa-instagram me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="instagram"
                        value={formData.social.instagram}
                        className="form-control"
                        placeholder="Instagram"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="social">
                      <label>
                        <i className="fab fa-linkedin me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="linkedin"
                        value={formData.social.linkedin}
                        className="form-control"
                        placeholder="LinkedIn"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fab fa-x me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="social.text"
                        name="x"
                        value={formData.social.x}
                        className="form-control"
                        placeholder="X"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fab fa-youtube me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="youtube"
                        value={formData.social.youtube}
                        className="form-control"
                        placeholder="Youtube"
                      />
                    </div>

                    <div className="social">
                      <label>
                        <i className="fab fa-tiktok me-2"></i>
                      </label>
                      <input
                        onChange={handleSocialChange}
                        type="text"
                        name="tiktok"
                        value={formData.social.tiktok}
                        className="form-control"
                        placeholder="TikTok"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="linea-divisoria mt-5"></div>
          {/*logo*/}
          <div className="section3CargaEdicion">
            <div>
              <label htmlFor="photo">
                <i className="obligatorio">* </i>Logo de su empresa
              </label>
              <div className="seclogo">
                <UserCircleIcon className="iconUser" aria-hidden="true" />
                <button onClick={loadFile} type="button">
                  Cargar
                </button>
                <input
                  onChange={handleFileChange}
                  className="company_logo_file"
                  type="file"
                  name="logo_image_name"
                  accept="image/*"
                  single="true"
                />
                {formData.logo_image_name}
              </div>
            </div>
            <label htmlFor="cover-photo" className="mt-5">
              <i className="obligatorio">* </i>Cargar imágenes de su negocio
              (máximo 6):
            </label>

            <div className="imgsEmpresa">
              <div>
                <PhotoIcon className="iconUser" aria-hidden="true" />
                <div className="cargaImg" onClick={selectImages}>
                  <label htmlFor="file-upload">
                    <input
                      onChange={handleFilesChange}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only company_images_files"
                      multiple={true}
                      max={6}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
                <div name="images_names" className="flex wrap">
                  {formData.images_names}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <span className="flex select-none items-center pl-3 text-gray-300 sm:text-sm">
                <i className="mr-1 obligatorio">* </i>Campos obligatorios
              </span>
            </div>
          </div>

          <div className="linea-divisoria col-span-full mt-5"></div>

          <div className="btnCargaEdicion">
            <button type="button" className="btnCancel">
              Cancelar
            </button>
            <button type="submit" className="btnGuardar">
              Guardar
            </button>
          </div>
        </form>
        <div className="p-4"></div>
      </div>
    </section>
  );
};

export default CargaEmpresa;
