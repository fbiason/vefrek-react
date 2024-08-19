import React, { useState, useRef, useEffect, useContext } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import {
  updateCompany,
  findCompany,
  deleteImageOfFirebase,
} from "../../utils/apiDb/apiDbAcions";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { useParams, useNavigate } from "react-router-dom";
import { verifyIfHasChanges } from "../../utils/utils";
import { UserContext } from "../../context/userContext";
import localidadesData from "./localidades.json";

export default function EditarEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();
  const initialData = useRef();
  const { userData } = useContext(UserContext);
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
    images: {
      logo: { url: "", delete: "" },
      images: [],
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

  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState("");

  const provinciasList = [
    ...new Set(
      localidadesData.localidades.map((localidad) => localidad.provincia.nombre)
    ),
  ];

  const handleProvinciaChange = (e) => {
    const selectedProvincia = e.target.value;
    setSelectedProvincia(selectedProvincia);
    const ciudadesList = localidadesData.localidades
      .filter((localidad) => localidad.provincia.nombre === selectedProvincia)
      .map((localidad) => localidad.nombre);
    setCiudades(ciudadesList);

    setFormData({
      ...formData,
      state: e.target.value,
    });
  };

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
      const filesArr = Array.from(files);
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
    const companyData = formRef.current;
    const completeData = new FormData();

    completeData.append("companyTextData", JSON.stringify(companyData));
    const logoInput = document.querySelector(".company_logo_input");
    const logoFile = logoInput.files[0];
    completeData.append("logo", logoFile);
    const imagesInput = document.querySelector(".company_images_input");
    const imagesFiles = imagesInput.files;

    if (
      !verifyIfHasChanges(initialData.current, formRef.current) &&
      logoInput.files.length === 0 &&
      imagesInput.files.length === 0
    ) {
      swalPopUp("Ops!", "No hay cambios para guardar", "warning");
      return;
    }

    for (const file of imagesFiles) {
      completeData.append("images", file);
    }

    showSpinner(true);
    const response = await updateCompany(id, completeData);
    if (response.success) {
      find();
      logoInput.value = "";
      imagesInput.value = "";
      swalPopUp("Tarea completada", response.message, "success");
    } else {
      swalPopUp("Error", response.message, "error");
    }
    showSpinner(false);
  };

  const find = async () => {
    showSpinner(true);
    if (!id) {
      showSpinner(false);
      swalPopUp(
        "Ops!",
        "No se ingresó el ID de la empresa a editar",
        "warning"
      );
      navigate("/");
      return;
    }
    const response = await findCompany("_id", id, "");
    const companyData = response.companyData;

    if (!response.success && !response.message.includes("pausado")) {
      showSpinner(false);
      swalPopUp("Ops!", response.message, "error");
      navigate("/");
      return;
    } else if (!response.success && response.message.includes("pausado")) {
      showSpinner(false);
      swalPopUp(
        "Ops!",
        "No Autorizado: No tienes los permisos necesarios para editar esta empresa",
        "warning"
      );
      navigate("/");
      return;
    }
    showSpinner(false);

    const auxFormData = {
      registeremail: companyData.registeremail,
      name: companyData.name,
      slogan: companyData.slogan,
      location: companyData.location,
      city: companyData.city,
      state: companyData.state,
      postal_code: companyData.postal_code,
      phone: companyData.phone,
      phone2: companyData.phone2,
      website: companyData.website,
      vefrek_website: companyData.vefrek_website,
      category: companyData.category,
      subcategory: companyData.subcategory,
      social: {
        email: companyData.social.email,
        whatsapp: companyData.social.whatsapp,
        facebook: companyData.social.facebook,
        instagram: companyData.social.instagram,
        x: companyData.social.x,
        linkedin: companyData.social.linkedin,
        tiktok: companyData.social.tiktok,
        youtube: companyData.social.youtube,
      },
      description: companyData.description,
      email_notifications: {
        comments: companyData.email_notifications.comments,
        news: companyData.email_notifications.news,
      },
      sms_notifications: {
        all: companyData.sms_notifications.all,
        same_email: companyData.sms_notifications.same_email,
        none: companyData.sms_notifications.none,
      },
      images: {
        logo: companyData.images.logo,
        images: companyData.images.images,
      },
      schedules: companyData.schedules,
    };

    auxFormData.schedules.scheduleType === "P" ? setHDef(false) : setHDef(true);

    setFormData(structuredClone(auxFormData));
    initialData.current = structuredClone(auxFormData);

    const optionsSelect = document.querySelector(".form_select");
    if (optionsSelect) {
      const options = optionsSelect.options;
      for (let i = 0; i < options.length; i++) {
        if (
          options[i].value.split(",")[1] &&
          options[i].value.split(",")[1].trim() === companyData.subcategory
        ) {
          options[i].selected = true;
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (userData.isLogged) find();
  }, [id, userData]);

  const deleteImg = async (deletePath) => {
    try {
      const response = await deleteImageOfFirebase(deletePath);
      if (response.success) {
        swalPopUp("Tarea completada", response.message);
        find();
      } else {
        swalPopUp("Ops!", response.message, "warning");
      }
    } catch (err) {
      swalPopUp(
        "Ops!",
        `Error al eliminar imagen del servidor: ${err.message}`,
        "error"
      );
    }
  };

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

  const setTipoHorarios = (e) => {
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

  const handleInputChange = (dia, turno, e) => {
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

  const handleInputChangeDef = (turno, e) => {
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

  const horarioPersJSX = (
    <div>
      <div>
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
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLocaleLowerCase();
              return (
                <React.Fragment key={dia}>
                  <tr>
                    <td>{dia}</td>
                    <td className="diaOpenClose">
                      <div className="input-group">
                        <select
                          value={
                            formData.schedules &&
                            formData.schedules.personalized
                              ? formData.schedules.personalized[dia].open1
                              : ""
                          }
                          onChange={(e) => handleInputChange(dia, "open1", e)}
                        >
                          <option value="" disabled hidden>
                            Selecciona una hora
                          </option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="clear-btn"
                          onClick={() =>
                            handleInputChange(dia, "open1", {
                              target: { value: "" },
                            })
                          }
                        >
                          Limpiar
                        </button>
                      </div>
                    </td>
                    <td className="diaOpenClose">
                      <div className="input-group">
                        <select
                          value={
                            formData.schedules &&
                            formData.schedules.personalized
                              ? formData.schedules.personalized[dia].close1
                              : ""
                          }
                          onChange={(e) => handleInputChange(dia, "close1", e)}
                        >
                          <option value="" disabled hidden>
                            Selecciona una hora
                          </option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="clear-btn"
                          onClick={() =>
                            handleInputChange(dia, "close1", {
                              target: { value: "" },
                            })
                          }
                        >
                          Limpiar
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="diaOpenClose">
                      <div className="input-group">
                        <select
                          value={
                            formData.schedules &&
                            formData.schedules.personalized
                              ? formData.schedules.personalized[dia].open2
                              : ""
                          }
                          onChange={(e) => handleInputChange(dia, "open2", e)}
                        >
                          <option value="" disabled hidden>
                            Selecciona una hora
                          </option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="clear-btn"
                          onClick={() =>
                            handleInputChange(dia, "open2", {
                              target: { value: "" },
                            })
                          }
                        >
                          Limpiar
                        </button>
                      </div>
                    </td>
                    <td className="diaOpenClose">
                      <div className="input-group">
                        <select
                          value={
                            formData.schedules &&
                            formData.schedules.personalized
                              ? formData.schedules.personalized[dia].close2
                              : ""
                          }
                          onChange={(e) => handleInputChange(dia, "close2", e)}
                        >
                          <option value="" disabled hidden>
                            Selecciona una hora
                          </option>
                          {generarHorarios().map((hora) => (
                            <option key={hora} value={hora}>
                              {hora}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="clear-btn"
                          onClick={() =>
                            handleInputChange(dia, "close2", {
                              target: { value: "" },
                            })
                          }
                        >
                          Limpiar
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const horarioDefJSX = (
    <div>
      <div>
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
                  value={
                    formData.schedules.custom
                      ? formData.schedules.custom.open1
                      : ""
                  }
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
                  value={
                    formData.schedules.custom
                      ? formData.schedules.custom.close1
                      : ""
                  }
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
                  value={
                    formData.schedules.custom
                      ? formData.schedules.custom.open2
                      : ""
                  }
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
                  value={
                    formData.schedules.custom
                      ? formData.schedules.custom.close2
                      : ""
                  }
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

  return (
    <section className="bg-formEmpresa">
      <div>
        <form className="form-empresa" onSubmit={handleSubmit}>
          <div>
            <h1 className="form-titulo">Edición de negocio</h1>
            <p className="form-descripcion">
              Si es propietario de un negocio referido al rubro automotor puede
              cargarlo <b>GRATIS</b> en nuestro sitio web.
            </p>

            <div className="datos-form">
              <div className="campo-formEmpresa">
                <label htmlFor="first-name">
                  <i className="obligatorio">*</i> Nombre de Empresa
                </label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    name="name"
                    id="first-name"
                    autoComplete="given-name"
                    placeholder="Ejemplo: Vefrek"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="slogan">Slogan (opcional)</label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.slogan}
                    type="text"
                    name="slogan"
                    id="slogan"
                    autoComplete="family-name"
                    placeholder="Ejemplo: Tu lugar de confianza"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="postal-code">CUIT</label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.postal_code}
                    type="text"
                    name="postal_code"
                    id="postal-code"
                    autoComplete="postal-code"
                    placeholder="Ejemplo: 20-12345678-9"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="street-address">
                  <i className="obligatorio">*</i> Dirección
                </label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.location}
                    type="text"
                    name="location"
                    id="street-address"
                    autoComplete="street-address"
                    placeholder="Ejemplo: Av. Siempre Viva 123"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="region">
                  <i className="obligatorio">*</i> Provincia
                </label>
                <div className="input-container">
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

              <div className="campo-formEmpresa">
                <label htmlFor="city">
                  <i className="obligatorio">*</i> Ciudad
                </label>
                <div className="input-container">
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

              <div className="campo-formEmpresa">
                <label htmlFor="postal-code">
                  <i className="obligatorio">*</i> Código Postal
                </label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.postal_code}
                    type="text"
                    name="postal_code"
                    id="postal-code"
                    autoComplete="postal-code"
                    placeholder="Ejemplo: 1234"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="phone">
                  <i className="obligatorio">*</i> Teléfono
                </label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.phone}
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="given-name"
                    placeholder="Ejemplo: 1234-5678"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="phone2">Teléfono Alternativo (opcional)</label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.phone2}
                    type="text"
                    name="phone2"
                    id="phone2"
                    autoComplete="family-name"
                    placeholder="Ejemplo: 1234-5678"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label htmlFor="website">Sitio Web (opcional)</label>
                <div className="input-container">
                  <input
                    onChange={handleChange}
                    value={formData.website}
                    type="text"
                    name="website"
                    id="website"
                    autoComplete="family-name"
                    placeholder="Ejemplo: www.tuempresa.com"
                  />
                </div>
              </div>

              <div className="campo-formEmpresa">
                <label>
                  <i className="obligatorio">*</i> Categoría:
                </label>
                <div className="input-container">
                  <select
                    name="category"
                    onChange={handleCategoryChange}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Selecciona una categoría
                    </option>
                    <option disabled style={{ color: "darkgray" }}>
                      - Reparación y Mantenimiento
                    </option>
                    <option value="Reparación y mantenimiento, Gomería">
                      -- Gomerías
                    </option>
                    <option value="Reparación y mantenimiento, Taller mecánico">
                      -- Talleres Mecánicos
                    </option>
                    <option value="Reparación y mantenimiento, Repuestos">
                      -- Repuestos
                    </option>
                    <option value="Reparación y mantenimiento, Lubricentro">
                      -- Lubricentros
                    </option>
                    <option disabled style={{ color: "darkgray" }}>
                      - Venta y Alquiler de vehículos
                    </option>
                    <option value="Venta y alquiler de vehículos, Agencia">
                      -- Agencia
                    </option>
                    <option value="Venta y alquiler de vehículos, Rent a Car">
                      -- Rent a Car
                    </option>
                    <option disabled style={{ color: "darkgray" }}>
                      - Otros Servicios
                    </option>
                    <option value="Otros servicios, Aseguradora">
                      -- Aseguradoras
                    </option>
                    <option value="Otros servicios, Estación de Servicio">
                      -- Estaciones de Servicios
                    </option>
                    <option value="Otros servicios, Estética del automotor">
                      -- Estética del Automotor
                    </option>
                    <option value="Otros servicios, Servicios de Emergencia">
                      -- Servicios de emergencia
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-carga-edicion">
            <button type="submit" className="btn-guardar">
              Guardar seccion
            </button>
          </div>

          <div className="linea-divisoria"></div>
          <div className="horarios-cont">
            <label className="form-label-business">
              <i className="obligatorio">*</i> Horarios:
            </label>
            <select
              className="form-select-business btn-personalizar"
              onChange={setTipoHorarios}
              value={formData.schedules.scheduleType}
            >
              <option value="LaV">Lunes a Viernes</option>
              <option value="LaS">Lunes a Sábado</option>
              <option value="LaD">Todos los días</option>
              <option value="P">Personalizar</option>
            </select>
            {hDef && horarioDefJSX}
            {!hDef && horarioPersJSX}
          </div>

          <div className="btn-carga-edicion">
            <button type="submit" className="btn-guardar">
              Guardar seccion
            </button>
          </div>
          <div className="linea-divisoria"></div>

          <div className="campos-redes">
            <div className="campo-red">
              <label>
                <i className="fab fa-whatsapp me-2"></i>
                <span className="obligatorio">*</span>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="whatsapp"
                value={formData.social.whatsapp}
                placeholder="WhatsApp"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fas fa-envelope me-2"></i>
                <span className="obligatorio">*</span>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="email"
                value={formData.social.email}
                placeholder="Mail"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-facebook me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="facebook"
                value={formData.social.facebook}
                placeholder="Facebook"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-instagram me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="instagram"
                value={formData.social.instagram}
                placeholder="Instagram"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-linkedin me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="linkedin"
                value={formData.social.linkedin}
                placeholder="LinkedIn"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-x me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="x"
                value={formData.social.x}
                placeholder="X"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-youtube me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="youtube"
                value={formData.social.youtube}
                placeholder="Youtube"
              />
            </div>

            <div className="campo-red">
              <label>
                <i className="fab fa-tiktok me-2"></i>
              </label>
              <input
                onChange={handleSocialChange}
                type="text"
                name="tiktok"
                value={formData.social.tiktok}
                placeholder="TikTok"
              />
            </div>
          </div>
          <div className="btn-carga-edicion">
            <button type="submit" className="btn-guardar">
              Guardar seccion
            </button>
          </div>
          <div className="linea-divisoria"></div>

          <div className="logo-section">
            <label htmlFor="photo">
              <i className="obligatorio">*</i> Logo de su empresa
            </label>
            <div className="seclogo">
              {formData.images.logo.url ? (
                <img
                  src={formData.images.logo.url}
                  alt="Logo"
                  className="editar-empresa-logo"
                />
              ) : (
                <UserCircleIcon className="icon-user" aria-hidden="true" />
              )}

              <button onClick={loadFile} type="button" className="btn-custom">
                Cambiar
              </button>
              <input
                onChange={handleFileChange}
                className="company-logo-input"
                type="file"
                name="logo_image_name"
                accept="image/*"
                single="true"
              />
              {formData.logo_image_name}
            </div>
          </div>

          <div className="images-section">
            <label htmlFor="cover-photo">
              <i className="obligatorio">*</i> Cargar imágenes de su negocio
              (máximo 6):
            </label>
            <div className="imgs-empresa">
              <div className="cuadro-edicion">
                <PhotoIcon className="icon-user" aria-hidden="true" />
                <div className="file-upload-wrapper">
                  <label htmlFor="file-upload" className="file-upload-label">
                    Elegir archivos
                    <input
                      onChange={handleFilesChange}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple={true}
                      max={6}
                    />
                  </label>
                  <span className="file-upload-info">
                    Ningún archivo seleccionado
                  </span>
                </div>

                <p>PNG, JPG, GIF up to 10MB</p>
                <div name="images_names">{formData.images_names}</div>
              </div>
            </div>
          </div>

          <div className="editar-empresa-imagenes-cont">
            {formData.images.images.length > 0 ? (
              formData.images.images.map((data, i) => (
                <div className="editar-empresa-imagen-cont" key={i}>
                  <img
                    src={data.url}
                    alt="Imágenes empresa"
                    className="editar-empresa-imagen"
                  />
                  <img
                    src="/images/icons/delete.png"
                    alt="Delete"
                    title="Eliminar imagen"
                    className="editar-empresa-delete-icon"
                    onClick={() => deleteImg(data.delete)}
                  />
                </div>
              ))
            ) : (
              <></>
            )}

            {formData.images.images.length < 6 && (
              <div className="editar-empresa-imagen-cont">
                <div className="imagen-placeholder">
                  <i className="fas fa-image"></i>{" "}
                  {/* Icono de imagen no cargada */}
                </div>
              </div>
            )}
          </div>

          <div className="campos-obligatorios">
            <span>
              <i className="obligatorio">*</i> &nbsp; Campos obligatorios
            </span>
          </div>

          <div className="linea-divisoria"></div>

          <div className="btn-carga-edicion">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
