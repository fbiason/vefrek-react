import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { swalPopUp } from "../../utils/swal";
import { UserContext } from "../../context/userContext";
import "../../styles/Navbar/dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const thisLocation = useLocation();
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext);
  const timerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer if opening the dropdown
    if (!isOpen) {
      timerRef.current = setTimeout(() => {
        setIsOpen(false);
        timerRef.current = null;
      }, 5000);
    }
  };

  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
    <div className="dropdown-container">
      <button 
        className="dropdown-button" 
        onClick={toggleDropdown}
      >
        <i className="fas fa-user-circle" /> Perfil
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <Link className="link-dropdown" to="/Perfil">
            <p>
              <i className="fas fa-edit" /> Editar
            </p>
          </Link>
          <Link className="link-dropdown" to="/NegociosDash">
            <p>
              <i className="fas fa-bullhorn" /> Mis anuncios
            </p>
          </Link>
          <Link className="link-dropdown" to="/Dashboard" onClick={toDash}>
            <p>
              <i className="fas fa-tachometer-alt" /> Dashboard
            </p>
          </Link>
          <Link className="link-dropdown" to="/" onClick={exit}>
            <p>
              <i className="fas fa-sign-out-alt" /> Logout
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
