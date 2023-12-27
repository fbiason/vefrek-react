import React, { useState } from "react";
import "./dropdown.css";

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
          <p>
            <i className="fas fa-edit" /> Editar
          </p>
          <p>
            <i className="fas fa-bullhorn" /> Mis anuncios
          </p>
          <p>
            <i className="fas fa-sign-out-alt" /> Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
