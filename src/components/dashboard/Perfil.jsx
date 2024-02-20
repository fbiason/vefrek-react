import { UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import "./perfil.css";
import { useState, useEffect, useContext, useRef } from "react";
import { swalPopUp } from "../../utils/swal";
import { UserContext } from "../../context/userContext";
import { findUser, updateUser } from "../../utils/apiDb/apiDbAcions";
import { SpinnerContext } from "../../context/spinnerContext";
import { verifyIfHasChanges } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";

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
      avatarFileInput.value = ""; //Vaciamos input de imagen de avatar
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
    <main className="dashMain">
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

      <div className="background-item d-flex justify-content-center">
        <form
          className="form-dash-perfil rounded-md p-6 userUpdateForm m-5"
          onSubmit={handleSubmit}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7">Perfil</h2>
              <p className="mt-1 text-sm leading-6 text-gray-200">
                Esta información se mostrará públicamente, así que tenga cuidado
                con lo que comparte.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900  w-full"
                  >
                    <i className="obligatorio">* </i>Nombre de usuario
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-200 sm:text-sm">
                        vefrek.com/
                      </span>
                      <input
                        onChange={handleChange}
                        value={formData.username}
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="nombreusuario"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sobre mi
                  </label>
                  <div className="mt-2">
                    <textarea
                      onChange={handleChange}
                      value={formData.about}
                      id="about"
                      name="about"
                      rows={3}
                      placeholder=" (hasta 300 caracteres)"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Avatar
                  </label>
                  <div className="mt-2 d-flex align-items-start gap-3">
                    {(formData.avatar.url && (
                      <img
                        className="perfil_avatar"
                        src={formData.avatar.url}
                        alt="avatar"
                      />
                    )) ||
                      (!formData.avatar.url && (
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300 ms-2"
                          aria-hidden="true"
                        />
                      ))}
                    <button
                      onClick={loadFile}
                      type="button"
                      name="otrasImagenes"
                      accept="image/*"
                      className="button-small rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Información personal
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      value={formData.country}
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Argentina</option>
                      <option>Uruguay</option>
                      <option>Chile</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>Ciudad
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={formData.city}
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    <i className="obligatorio">* </i>Provincia
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={formData.state}
                      type="text"
                      name="state"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

            {/*  <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notificaciones
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Siempre te informaremos sobre cambios importantes, pero tú
                eliges qué más quieres escuchar.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Vía mail
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          onChange={handleCheckChange}
                          checked={formData.email_notifications}
                          id="comments"
                          name="email_notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comentarios
                        </label>
                        <p className="text-gray-500">
                          Reciba notificaciones cuando alguien publique un
                          comentario en una publicación.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Notificaciones push
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Estos se envían por SMS a su teléfono móvil.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handleCheckChange}
                        checked={formData.sms_notifications.all}
                        id="push-everything"
                        name="all"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Todo
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handleCheckChange}
                        checked={formData.sms_notifications.same_email}
                        id="push-email"
                        name="same_email"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Igual que el correo electrónico
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        onChange={handleCheckChange}
                        checked={formData.sms_notifications.none}
                        id="push-nothing"
                        name="none"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Sin notificaciones push
                      </label>
                    </div>
                  </div>
                      </fieldset>
              </div>
            </div>*/}
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-white rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-500 px-3 py-2 text-white text-sm font-semibold shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Perfil;
