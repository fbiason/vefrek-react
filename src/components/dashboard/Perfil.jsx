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

      const avatarFileInput = document.querySelector(".perfil_file_input");
      avatarFileInput.value = "";
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
    const avatarFileInput = document.querySelector(".perfil_file_input");

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
    <main className="dashboardMain">
      <NavBarDash></NavBarDash>
      <button
        className="btn btn-primary dashboardClose"
        onClick={() => {
          const previousSaved = localStorage.getItem("previousPathToDash");
          previousSaved
            ? navigate(localStorage.getItem("previousPathToDash"))
            : navigate("/");
        }}
      >
        Salir
      </button>

      <div className="content d-flex justify-content-center">
        <form
          className="form-dash-perfil rounded-mduserUpdateForm m-5 p-3"
          onSubmit={handleSubmit}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <h2 className="titulo-dash">Perfil</h2>
              <p className="mt-1 text-sm leading-6 text-gray-200">
                Esta información se mostrará públicamente, así que tenga cuidado
                con lo que comparte.
              </p>

              <div className="clasePerfil-1">
                <div className="clasePerfil-2">
                  <label htmlFor="photo">Avatar</label>
                  <div className="perfilAvatar">
                    {(formData.avatar.url && (
                      <img
                        className="perfil_avatar"
                        src={formData.avatar.url}
                        alt="avatar"
                      />
                    )) ||
                      (!formData.avatar.url && (
                        <UserCircleIcon
                          className="userIcon"
                          aria-hidden="true"
                        />
                      ))}
                    <button
                      onClick={loadFile}
                      type="button"
                      name="otrasImagenes"
                      accept="image/*"
                      className="cambiarAvatar"
                    >
                      Cambiar
                    </button>
                    <input
                      className="perfil_file_input"
                      type="file"
                      name="avatar_image_name"
                      accept="image/*"
                      single="true"
                      onChange={handleFileChange}
                    />
                    {formData.avatar_image_name}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Información personal
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>Nombre
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={formData.name}
                      type="text"
                      name="name"
                      id="first-name"
                      autoComplete="given-name"
                      className="form-control form-control-sm camposPerfil"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>Apellido
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={formData.lastname}
                      type="text"
                      name="lastname"
                      id="last-name"
                      autoComplete="family-name"
                      className="form-control form-control-sm camposPerfil"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>Mail
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={formData.email2}
                      id="email"
                      name="email2"
                      type="email"
                      autoComplete="email"
                      className="form-control form-control-sm camposPerfil"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>País
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={handleChange}
                      value={" " + formData.country}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="form-control form-control-sm camposPerfil"
                    >
                      <option>Argentina</option>
                      <option>Uruguay</option>
                      <option>Chile</option>
                    </select>
                  </div>
                </div>

                {/* PROVINCIAS*/}
                <div className="campos camposS2 sm:col-span-3">
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
                <div className="campos camposS2 sm:col-span-3">
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

                <div className="sm:col-span-4">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                      className="form-control form-control-sm camposPerfil"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900 w-full "
                  >
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
                      className="form-control form-control-sm camposPerfil"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <span className="flex select-none items-center pl-3 text-gray-200 sm:text-sm">
                  *Campos obligatorios
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="submit" className="btn btnPerfilGuardar">
              Guardar
            </button>
            <button className="btn btnPerfilCancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Perfil;
