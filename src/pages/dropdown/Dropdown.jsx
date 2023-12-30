import { useState, useContext } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";
import { logOut } from "../../utils/auth/logOut";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { UserContext } from "../../context/userContext";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showSpinner } = useContext(SpinnerContext);
  const { updateUserData } = useContext(UserContext);

  const toggleDropdown = () => {
    console.log("Toggle dropdown");
    setIsOpen(!isOpen);
  };

  const exit = async () => {
    showSpinner(true);
    const response = await logOut();
    showSpinner(false);
    if (response.userData) {
      updateUserData(response.userData);
      swalPopUp("Sesión cerrada", response.message, "success");
    } else {
      swalPopUp("Error al cerrar sesión", response.message, "error");
    }
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        <i className="fas fa-user-circle text-start" /> Perfil
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <Link className="link-dropdown" to="/perfil">
            <p className=" text-start">
              <i className="fas fa-edit" /> Editar
            </p>
          </Link>
          <Link className="link-dropdown" to="/">
            {" "}
            <p className=" text-start">
              <i className="fas fa-bullhorn" /> Mis anuncios
            </p>{" "}
          </Link>
          <Link className="link-dropdown" to="/">
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
