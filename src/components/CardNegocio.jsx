import React from "react";
import { Link } from "react-router-dom";
import { handleFavorite } from "../utils/apiDb/apiDbAcions";
import { UserContext } from "../context/userContext";
import { useContext, useRef, useEffect } from "react";
import { swalPopUpSuccessTemporal, swalPopUp } from "../utils/swal";
import { SpinnerContext } from "../context/spinnerContext";
import { BsStarFill } from "react-icons/bs";

const CardNegocio = (props) => {
    const { userData } = useContext(UserContext);
    const { showSpinner } = useContext(SpinnerContext);
    const heartRef = useRef();

    const maxLength = 20; // Define la longitud máxima para nombre y dirección

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        }
        return text;
    };

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
            <div className="businessCard-container">
                <div className="businessCard">
                    <figure style={{ position: "relative" }}>
                        <div className="businessCard-favorite flex justify-end absolute">
                            <input
                                name="favorito"
                                type="checkbox"
                                ref={heartRef}
                                defaultChecked={false}
                            />
                            <label
                                className="businessCard-favoriteLabel"
                                onClick={handleFavorites}
                            >
                                <BsStarFill className="businessCard-starIcon" />
                            </label>
                        </div>
                        <img src={props.imgUrl} alt="Diseño Gráfico" />
                    </figure>
                    <div className="businessCard-content">
                        <h5>{props.subcategory}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h4>{truncateText(props.name, maxLength)}</h4>
                            {props.servicio_24hs && (
                                <div style={{
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    padding: '1px 4px',
                                    borderRadius: '4px',
                                    fontSize: '0.6rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    lineHeight: 1,
                                }}>
                                    24HS
                                </div>
                            )}
                        </div>
                        <p>{`📍: ${truncateText(props.location, maxLength)}`}</p>
                        <p>{`📞: ${props.phone}`}</p>
                        <Link to={`/${props.vefrek_website}`}> Más Info </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardNegocio;
