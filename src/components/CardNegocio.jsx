import React from "react";
import { Link } from "react-router-dom";
import "./cardnegocio.css";
import { handleFavorite } from "../utils/apiDb/apiDbAcions";
import { UserContext } from "../context/userContext";
import { useContext, useRef, useEffect } from "react";
import { swalPopUpSuccessTemporal, swalPopUp } from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";

const CardNegocio = (props) => {
  const { userData } = useContext(UserContext);
  const { showSpinner } = useContext(SpinnerContext);
  const heartRef = useRef();

  const handleFavorites = async () => {
    if (heartRef.current.checked === false) {
      showSpinner(true);
      const response = await handleFavorite(props.id, userData.email, "add");
      if (response.success) {
        swalPopUpSuccessTemporal("Favorito Agregado");
        heartRef.current.checked = true;
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    } else {
      showSpinner(true);
      const response = await handleFavorite(props.id, userData.email, "sus");
      if (response.success) {
        swalPopUpSuccessTemporal("Favorito Eliminado");
        heartRef.current.checked = false;
      } else {
        swalPopUp("Ops!", response.message, "error");
      }
      showSpinner(false);
    }
  };

  useEffect(() => {
    if (userData.isLogged && props.favorites && props.favorites.length > 0) {
      heartRef.current.nextSibling.style.display = "initial";
      const favoritesArr = props.favorites;
      if (favoritesArr.includes(userData.email))
        heartRef.current.checked = true;
    } else if (!userData.isLogged) {
      heartRef.current.nextSibling.style.display = "none";
    }

    // eslint-disable-next-line
  }, [userData.isLogged]);

  return (
    <div key={props._id}>
      <div className="container-card">
        <div className="card">
          <figure style={{ position: "relative" }}>
            <div className="favorito">
              <input
                name="favorito"
                type="checkbox"
                ref={heartRef}
                defaultChecked={false}
              />
              <label
                className="bi bi-heart-fill favoriteHeart"
                onClick={handleFavorites}
              ></label>
            </div>
            <img src={props.imgUrl} alt="Diseño Gráfico" />
          </figure>
          <div className="contenido-card">
            <h5>{props.subcategory}</h5>
            <h4>{props.name}</h4>
            <p>{`📍 Dirección: ${props.location}`}</p>
            <p>{`📞 Teléfono: ${props.phone}`}</p>
            <Link to={`/${props.vefrek_website}`}> Más Info </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNegocio;
