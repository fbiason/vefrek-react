import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarDash from "./NavBarDash";
import "./admin.css";

const Admin = () => {
  const [activeNavItem, setActiveNavItem] = useState(8);
  const [expandedUser, setExpandedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
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

  function getStatusColorClass(status) {
    switch (status) {
      case "Activo":
        return "status-activo";
      case "Inactivo":
        return "status-inactivo";
      case "Banneado":
        return "status-banneado";
      case "Suspendido":
        return "status-suspendido";
      default:
        return "";
    }
  }

  // Datos  de usuarios
  const users = [
    {
      id: 1,
      name: "fbiason",
      role: "Admin",
      status: "Activo",
      details: {
        fullName: "Franco Biason",
        email: "franco.biason@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9400",
        lastConnection: "21/03/2024 18:33hs",
        loadedCompanies: 23,
      },
    },

    {
      id: 2,
      name: "biweb",
      role: "Staff",
      status: "Inactivo",
      details: {
        fullName: "Ariel Conrado",
        email: "bi.web@gmail.com",
        city: "Quilmes",
        province: "Buenos Aires",
        postalCode: "9410",
        lastConnection: "18/03/2024 18:33hs",
        loadedCompanies: 2,
      },
    },

    {
      id: 3,
      name: "dreyes",
      role: "Admin",
      status: "Banneado",
      details: {
        fullName: "Denis Javier Reyes",
        email: "d.reyes@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9410",
        lastConnection: "18/03/2024 18:33hs",
        loadedCompanies: 10,
      },
    },

    {
      id: 4,
      name: "dreyes",
      role: "Admin",
      status: "Banneado",
      details: {
        fullName: "Denis Javier Reyes",
        email: "d.reyes@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9410",
        lastConnection: "18/03/2024 18:33hs",
        loadedCompanies: 10,
      },
    },

    {
      id: 5,
      name: "dreyes",
      role: "Admin",
      status: "Banneado",
      details: {
        fullName: "Denis Javier Reyes",
        email: "d.reyes@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9410",
        lastConnection: "18/03/2024 18:33hs",
        loadedCompanies: 10,
      },
    },

    {
      id: 6,
      name: "dreyes",
      role: "Admin",
      status: "Banneado",
      details: {
        fullName: "Denis Javier Reyes",
        email: "d.reyes@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9410",
        lastConnection: "18/03/2024 18:33hs",
        loadedCompanies: 10,
      },
    },
  ];

  // Datos de empresas
  const business = [
    {
      idBusiness: 1,
      nameBusiness: "Biason Automotores",
      usuarioBusiness: "Admin",
      verificada: "Si",
      details: {
        fullName: "Franco Biason",
        email: "franco.biason@gmail.com",
        city: "Rio Gallegos",
        province: "Santa Cruz",
        postalCode: "9400",
        lastConnection: "21/03/2024 18:33hs",
        loadedCompanies: 23,
        fechaCarga: "21/03/2024",
        // Agregar botones y sus funciones
        editar: () => {
          // Función para editar
        },
        pausar: () => {
          // Función para pausar
        },
        transferir: () => {
          // Función para transferir
        },
        eliminar: () => {
          // Función para eliminar
        },
      },
    },
  ];

  // Cantidad de usuarios por página
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);

  // Cantidad de empresas por página
  const businessPerPage = 5;

  const totalPagesBusiness = Math.ceil(business.length / businessPerPage);

  // Calcular índice del primer y último usuario en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const expandUserDetails = (userId) => {
    setExpandedUser(userId === expandedUser ? null : userId);
  };

  // Función para cambiar a la página anterior
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Función para cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Función para ir a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="dashboardMainAdmin">
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

      <section className="background-item">
        <div>
          <h1 className="titulo-dash">Admin</h1>
        </div>
        <div className="datos-user">
          <h2>Datos Usuarios</h2>
          <button className="btn-descarga mt-3">Descargar CSV</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ID Usuario"
                    />
                  </div>
                </th>
                <th>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre Usuario"
                    />
                  </div>
                </th>
                <th>
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option value="">Rol</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Miembro">Miembro</option>
                    </select>
                  </div>
                </th>
                <th>
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option value="">Status</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="Banneado">Banneado</option>
                      <option value="Suspendido">Suspendido</option>
                    </select>
                  </div>
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Nombre Usuario</th>
                <th>Rol</th>
                <th>Status</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td className={getStatusColorClass(user.status)}>
                      {user.status}
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => expandUserDetails(user.id)}
                      >
                        Ver más
                      </button>
                    </td>
                  </tr>
                  {expandedUser === user.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="user-details">
                          <p>{`Nombre: ${user.details.fullName}`}</p>
                          <p>{`Correo Electrónico: ${user.details.email}`}</p>
                          <p>{`Ciudad: ${user.details.city}`}</p>
                          <p>{`Provincia: ${user.details.province}`}</p>
                          <p>{`Código Postal: ${user.details.postalCode}`}</p>
                          <p>{`Última Conexión: ${user.details.lastConnection}`}</p>
                          <p>{`Empresas Cargadas: ${user.details.loadedCompanies}`}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="button-page">
            <button
              className="btn btn-secondary arrow"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn btn-secondary ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary arrow"
              onClick={goToNextPage}
              disabled={currentPage === totalPagesBusiness}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="datos-business mt-3">
          <h2>Datos Empresas</h2>
          <button className="btn-descarga mt-3">Descargar CSV</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ID Empresa"
                    />
                  </div>
                </th>
                <th>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre Empresa"
                    />
                  </div>
                </th>
                <th>
                  <div className="form-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Usuario que la cargo"
                    />
                  </div>
                </th>

                <th>
                  <div className="form-group mb-0">
                    <select className="form-control">
                      <option value="">Verificada</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </th>
              </tr>
              <tr>
                <th>ID Empresa</th>
                <th>Nombre Empresa</th>
                <th>Usuario que la cargo</th>
                <th>Verificada</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {business.map((empresa) => (
                <React.Fragment key={empresa.id}>
                  <tr>
                    <td>{empresa.idBusiness}</td>
                    <td>{empresa.nameBusiness}</td>
                    <td>{empresa.usuarioBusiness}</td>
                    <td>{empresa.verificada}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => expandUserDetails(empresa.id)}
                      >
                        Ver más
                      </button>
                    </td>
                  </tr>
                  {expandedUser === empresa.id && (
                    <tr>
                      <td colSpan="5">
                        <div className="business-details">
                          <p>{`Fecha de Carga: ${empresa.details.fechaCarga}`}</p>
                          <button
                            className="btn btn-primary"
                            onClick={empresa.details.editar}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={empresa.details.pausar}
                          >
                            Pausar
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={empresa.details.transferir}
                          >
                            Transferir
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={empresa.details.eliminar}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="button-page">
            <button
              className="btn btn-secondary arrow"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPagesBusiness }, (_, index) => (
              <button
                key={index}
                className={`btn btn-secondary ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-secondary arrow"
              onClick={goToNextPage}
              disabled={currentPage === totalPagesBusiness}
            >
              {">"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Admin;
