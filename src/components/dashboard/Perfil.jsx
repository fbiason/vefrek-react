import { UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useContext, useRef } from "react";
import { swalPopUp } from "../../utils/swal";
import { UserContext } from "../../context/userContext";
import { findUser, updateUser } from "../../utils/apiDb/apiDbAcions";
import { SpinnerContext } from "../../context/spinnerContext";
import { verifyIfHasChanges } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";
import localidadesData from "../../pages/formulario-empresa/localidades.json";

const Perfil = () => {
  const [activeNavItem, setActiveNavItem] = useState(1);
  const navigate = useNavigate();

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const menuItems = [
    { icon: "fa-house", text: "Inicio", to: "/Dashboard" },
    { icon: "fa-user", text: "Perfil", to: "/Perfil" },
    { icon: "fa-chart-bar", text: "Informe", to: "/Informe" },
    { icon: "fa-calendar", text: "Calendario", to: "/Calendario" },
    { icon: "fa-star", text: "Favoritos", to: "/Favoritos" },
    { icon: "fa-building", text: "Negocios", to: "/NegociosDash" },
    { icon: "fa-user-tie", text: "Administrador", to: "/Admin" },
  ];

  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const formDataRef = useRef();
  const initialData = useRef();
  const avatarFileInputRef = useRef(null); // Usando useRef para el input de archivo

  const formDataInitial = {
    username: "",
    about: "",
    name: "",
    lastname: "",
    email2: "",
    country: "",
    location: "",
    city: "",
    state: "",
    postal_code: "",
    email_notifications: false,
    sms_notifications: {
      all: false,
      same_email: false,
      none: true,
    },
    avatar: {
      url: "",
      delete: "",
    },
    avatar_image_name: "",
  };

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

  const [formData, setFormData] = useState(formDataInitial);

  const find = async () => {
    showSpinner(true);
    const response = await findUser("email", userData.email, "");
    if (response.success) {
      if (!response.userData.username)
        response.userData.username = userData.email;
      const auxUserData = response.userData;
      setFormData(structuredClone(auxUserData));
      initialData.current = structuredClone(auxUserData);

      // Ahora usamos el ref para el input de archivo
      if (avatarFileInputRef.current) {
        avatarFileInputRef.current.value = "";
      }
    } else {
      swalPopUp("Error", response.message, "error");
    }
    showSpinner(false);
  };

  useEffect(() => {
    if (userData.isLogged) find();
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handleSubmit = async (e) => {
    /* Actualizacion de datos de usuario */
    e.preventDefault();
    const avatarFileInput = avatarFileInputRef.current;

    if (
      !verifyIfHasChanges(initialData.current, formDataRef.current) &&
      avatarFileInput.files.length === 0
    ) {
      swalPopUp("Ops!", "No hay cambios para guardar", "warning");
      return;
    }

    formDataRef.current.email = userData.email;
    const formData = new FormData();
    if (!formDataRef.current.country) formDataRef.current.country = "Argentina";
    formData.append("file", avatarFileInput.files[0]);
    formData.append("userData", JSON.stringify(formDataRef.current));
    showSpinner(true);
    const response = await updateUser(formData);
    if (response.success) {
      find();
      swalPopUp("Perfil Actualizado", response.message, "success");
    } else {
      swalPopUp("Error", response.message, "error");
    }
    showSpinner(false);
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

  const loadFile = (e) => {
    e.target.nextSibling.click();
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    if (name === "email_notifications") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        sms_notifications: {
          all: false,
          same_email: false,
          none: false,
          [name]: true,
        },
      });
    }
  };

  return (
    <main className="dashboardMainPerfil">
      <NavBarDash />
      <button
        className="dashboardCloseBtn"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved
            ? navigate(localStorage.getItem("previousPathToDash"))
            : navigate("/");
        }}
      >
        Salir
      </button>

      <div className="formContainer">
        <form className="profileForm" onSubmit={handleSubmit}>
          <div className="formSection">
            <div className="sectionHeader">
              <h2 className="sectionTitle">Perfil</h2>
              <p className="sectionDescription">
                Esta información se mostrará públicamente, así que tenga cuidado
                con lo que comparte.
              </p>
            </div>

            <div className="formGroup">
              <label htmlFor="photo" className="formLabel">
                Avatar
              </label>
              <div className="perfilAvatar">
                {formData.avatar.url ? (
                  <img
                    className="perfil_avatar"
                    src={formData.avatar.url}
                    alt="avatar"
                  />
                ) : (
                  <UserCircleIcon className="userIcon" aria-hidden="true" />
                )}
                <button
                  onClick={loadFile}
                  type="button"
                  className="changeAvatarBtn"
                >
                  Cambiar
                </button>
                <input
                  ref={avatarFileInputRef} // Asignar el ref al input de archivo
                  className="fileInput"
                  type="file"
                  name="avatar_image_name"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {formData.avatar_image_name}
              </div>
            </div>
          </div>

          <div className="formSection">
            <h2 className="sectionTitle">Información personal</h2>
            <div className="formGrid">
              <div className="formGroup">
                <label htmlFor="first-name" className="formLabel">
                  <span className="required">*</span> Nombre
                </label>
                <input
                  onChange={handleChange}
                  value={formData.name || ""}
                  type="text"
                  name="name"
                  id="first-name"
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label htmlFor="last-name" className="formLabel">
                  <span className="required">*</span> Apellido
                </label>
                <input
                  onChange={handleChange}
                  value={formData.lastname}
                  type="text"
                  name="lastname"
                  id="last-name"
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label htmlFor="email" className="formLabel">
                  <span className="required">*</span> Mail
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email2}
                  type="email"
                  name="email2"
                  id="email"
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label htmlFor="country" className="formLabel">
                  <span className="required">*</span> País
                </label>
                <select
                  onChange={handleChange}
                  value={formData.country}
                  id="country"
                  name="country"
                  className="formSelect"
                >
                  <option>Argentina</option>
                  <option>Uruguay</option>
                  <option>Chile</option>
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="region" className="formLabel">
                  <span className="required">*</span> Provincia
                </label>
                <select
                  id="selectProvincias"
                  onChange={handleProvinciaChange}
                  value={selectedProvincia}
                  name="state"
                  className="formSelect"
                >
                  <option value="">Selecciona una provincia</option>
                  {provinciasList.map((provincia, index) => (
                    <option key={index} value={provincia}>
                      {provincia}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="city" className="formLabel">
                  <span className="required">*</span> Ciudad
                </label>
                <select
                  id="selectCiudades"
                  name="city"
                  onChange={handleChange}
                  className="formSelect"
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                      {ciudad}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formGroup">
                <label htmlFor="street-address" className="formLabel">
                  <span className="required">*</span> Dirección
                </label>
                <input
                  onChange={handleChange}
                  value={formData.location}
                  type="text"
                  name="location"
                  id="street-address"
                  className="formInput"
                />
              </div>

              <div className="formGroup">
                <label htmlFor="postal-code" className="formLabel">
                  <span className="required">*</span> Código Postal
                </label>
                <input
                  onChange={handleChange}
                  value={formData.postal_code}
                  type="text"
                  name="postal_code"
                  id="postal-code"
                  className="formInput"
                />
              </div>
            </div>
          </div>

          <div className="formActions">
            <button type="submit" className="saveBtn">
              Guardar
            </button>
            <button type="button" className="cancelBtn">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Perfil;
