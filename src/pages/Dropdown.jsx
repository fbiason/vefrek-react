import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { swalPopUp } from "../utils/swal";
import { UserContext } from "../context/userContext";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const thisLocation = useLocation();
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const exit = async (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    updateUserData({ email: "", name: "", isLogged: false });
    swalPopUp("LogOut", "Cierre de sesión exitoso", "success");
  };

  const toDash = (e) => {
    e.preventDefault();
    localStorage.setItem("previousPathToDash", thisLocation.pathname);
    navigate("/Dashboard");
  };

  return (
    <div
      className="dropdown-container"
      onClick={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      <ul>
        <li></li>
        <button className="dropdown-button">
          <i className="fas fa-user-circle text-start" /> Perfil
        </button>
      </ul>

      {isOpen && (
        <div className="dropdown-content">
          <Link className="link-dropdown" to="/Perfil">
            <p className=" text-start">
              <i className="fas fa-edit" /> Editar
            </p>
          </Link>
          <Link className="link-dropdown" to="/NegociosDash">
            {" "}
            <p className=" text-start">
              <i className="fas fa-bullhorn" /> Mis anuncios
            </p>{" "}
          </Link>
          <Link className="link-dropdown" to="/Dashboard" onClick={toDash}>
            {" "}
            <p className=" text-start">
              <i className="fas fa-tachometer-alt" /> Dashboard{" "}
              {/* Cambio de icono */}
            </p>
          </Link>
          <Link className="link-dropdown" to="/" onClick={exit}>
            {" "}
            <p className=" text-start">
              <i className="fas fa-sign-out-alt" /> Logout
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
