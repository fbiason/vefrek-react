import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import "./prueba-carga.css";
import { addCompany } from "../../utils/apiDb/apiDbAcions";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";

const PruebaCarga = () => {
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    slogan: "",
    location: "",
    phone: "",
    phone2: "",
    website: "",
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
    logo: null,
    frontimage: null,
    images: [],
    opening: "09:00",
  });

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
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const forms = document.querySelectorAll("form");
    const formsArr = Array.from(forms);
    const formsDataArr = formsArr.map((form) => new FormData(form));
    let formsDataArrJoin = [];
    formsDataArr.forEach((form) => {
      formsDataArrJoin = [...formsDataArrJoin, ...form];
    });
    const data = Object.fromEntries(formsDataArrJoin);
    const companyData = {
      name: data.name || "",
      slogan: data.slogan || "",
      location: data.location || "",
      phone: data.phone || "",
      phone2: data.phone2 || "",
      website: data.website || "",
      category: data.category ? data.category.split(",")[0] : "",
      subcategory: data.category ? data.category.split(",")[1] : "",
      description: data.description,
      social: {
        whatsapp: data.whatsapp || "",
        email: data.email || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        x: data.x || "",
        linkedin: data.linkedin || "",
        tiktok: data.tiktok || "",
        youtube: data.youtube || "",
      },
      schedule: {
        opening: "09:00" || "",
        closing: data.closing || "",
      },
    };
    companyData.registeremail = userData.email;

    const completeData = new FormData();
    completeData.append("companyTextData", JSON.stringify(companyData));
    completeData.append("files", data.logo);
    const files = document.querySelector(".multiplefiles").files;
    for (const file of files) {
      completeData.append("files", file);
    }
    const response = await addCompany(completeData);
    response.success
      ? swalPopUp("Tarea completada", response.message, "success")
      : swalPopUp("Error", response.message, "error");
    // console.log("Datos del formulario:", formData);
  };

  return (
    <section className="background">
      <form className="form-prueba border border-gray-300 rounded-md p-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="font-semibold leading-7 text-gray-900 mt-3">
            Carga de negocio
          </h1>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            Si es propietario de un negocio referido al rubro automotor puede
            cargarlo <b>GRATIS</b> en nuestro sitio web.
          </p>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre de Empresa
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
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
                Slogan (opcional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
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
                Ciudad
              </label>
              <div className="mt-2">
                <input
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
                Provincia
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Código Postal
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Teléfono Alternativo (opcional)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Sitio Web:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="block text-sm font-medium leading-6 text-gray-900">
                <label>Categoría: </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    <span>Selecciona una categoría</span>
                  </option>
                  <option disabled style={{ color: "darkgray" }}>
                    - Reparación y Mantenimiento
                  </option>
                  <option value="rep_mant, Gomería">
                    -- Gomerías (arreglo y venta de cubiertas, alineación y
                    balanceo)
                  </option>
                  <option value="rep_mant, Taller Mecánico">
                    -- Talleres Mecánicos (Mecánico, Chapistas, Electricistas)
                  </option>
                  <option value="rep_mant, Repuestos">
                    -- Repuestos (Autopartes)
                  </option>
                  <option value="rep_mant, Lubricentro">-- Lubricentros</option>
                  <option
                    disabled
                    style={{ color: "darkgray" }}
                    value="venta_alquiler"
                  >
                    - Venta y Alquiler de vehículos
                  </option>
                  <option value="venta_alq_v, Agencia">
                    -- Agencia (Concesionaria oficiales y Agencias particulares)
                  </option>
                  <option value="venta_alq_v, Rent a Car">
                    -- Rent a Car (Alquiler de autos)
                  </option>
                  <option
                    disabled
                    style={{ color: "darkgray" }}
                    value="otros_servicios"
                  >
                    - Otros Servicios
                  </option>
                  <option value="otras, Aseguradoras">-- Aseguradoras</option>
                  <option value="otras, Estacion de Servicio">
                    -- Estaciones de Servicios
                  </option>
                  <option value="otras, Estética del automotor">
                    -- Estética del Automotor (Lavaderos, Polarizados)
                  </option>
                  <option value="otras, Servicios de Emergencia">
                    -- Servicios de emergencia (Grúas, Cerrajeros)
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="linea-divisoria"></div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ingrese la URL de su sitio web comercial:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    vefrek.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="nombre-negocio"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Descripción
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  placeholder=" Describa brevemente su empresa."
                />
              </div>
            </div>

            <div className="perfil-card col-span-full">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-whatsapp me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="WhatsApp"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-facebook me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Facebook"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-instagram me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Instagram"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-tiktok me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="TikTok"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-linkedin me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="LinkedIn"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-x me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="x"
                        value={formData.x}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="X"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fab fa-youtube me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Youtube"
                      />
                    </div>

                    <div className="form-col red-whith d-flex align-items-center">
                      <label>
                        <i className="fas fa-envelope me-2"></i>
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Mail"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="linea-divisoria col-span-full"></div>

        <div className="col-span-full mt-3">
          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900 mt-3"
            >
              Logo de su empresa
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <UserCircleIcon
                className="h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
              >
                Cargar
              </button>
            </div>
          </div>
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900 mt-5 col-span-full"
          >
            Cargar imágenes de su negocio (máximo 6):
          </label>

          <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mx-auto">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 cargar-img"
                >
                  <span>Cargar imagen </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="linea-divisoria col-span-full mt-5"></div>

        <div className="mt-5">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notificaciones
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Siempre te informaremos sobre cambios importantes, pero tú eliges
            qué las notificaciones que desees recibir.
          </p>

          <div className="mt-3 space-y-10 ">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="Comentarios"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />{" "}
                    <label
                      htmlFor="comments"
                      className="text-sm leading-6 pl-3 font-medium text-gray-900"
                    >
                      Comentarios
                    </label>
                  </div>
                </div>

                <div className="relative gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="Comentarios"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />{" "}
                    <label
                      htmlFor="comments"
                      className="text-sm leading-6 pl-3 font-medium text-gray-900"
                    >
                      Novedades de Vefrek
                    </label>
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
                    id="push-everything"
                    name="push-notifications"
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
                    id="push-email"
                    name="push-notifications"
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
                    id="push-nothing"
                    name="push-notifications"
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
    </section>
  );
};

export default PruebaCarga;
