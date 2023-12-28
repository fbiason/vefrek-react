import React, { useState } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    console.log("Toggle dropdown");
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        <i className="fas fa-user-circle" /> Perfil
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <Link to="/perfil">
            <p>
              <i className="fas fa-edit text-start" /> Editar
            </p>
          </Link>
          <p>
            <i className="fas fa-bullhorn text-start" /> Mis anuncios
          </p>
          <p>
            <i className="fas fa-sign-out-alt text-start" /> Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
