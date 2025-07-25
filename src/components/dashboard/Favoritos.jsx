import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardNegocio from "../CardNegocio";
import { UserContext } from "../../context/userContext";
import { swalPopUp } from "../../utils/swal";
import { SpinnerContext } from "../../context/spinnerContext";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import NavBarDash from "./NavBarDash";
import "../../styles/dashboard/Dashboard.css";
import "../../styles/dashboard/Favoritos.css";

const Favoritos = () => {
    const { userData } = useContext(UserContext);
    const { showSpinner } = useContext(SpinnerContext);
    const [favoritesCompanys, setFavoritesCompanys] = useState([]);
    const navigate = useNavigate();

    const getFavoritesCompanys = async () => {
        const matchJSON = JSON.stringify({ favorites: { $in: [userData.email] } });
        const aggregateQueryJSON = JSON.stringify([
            { $limit: 8 },
            {
                $project: {
                    subcategory: 1,
                    name: 1,
                    "images.images": 1,
                    location: 1,
                    phone: 1,
                    _id: 1,
                    vefrek_website: 1,
                    favorites: 1,
                },
            },
        ]);

        showSpinner(true);
        const response = await findCompanys(matchJSON, aggregateQueryJSON);
        if (response.success && response.companysData) {
            const jsxArr = response.companysData.map((company) => (
                <div  key={company._id}>
                    <CardNegocio
                        subcategory={company.subcategory}
                        name={company.name}
                        imgUrl={
                            company.images.images[0] ? company.images.images[0].url : ""
                        }
                        location={company.location}
                        phone={company.phone}
                        id={company._id}
                        vefrek_website={company.vefrek_website}
                        favorites={company.favorites}
                    />
                </div>
            ));
            setFavoritesCompanys(jsxArr);
        } else if (response.success && !response.companysData) {
            setFavoritesCompanys(<p className="col">No hay resultados</p>);
        } else {
            swalPopUp("Ops!", response.message, "error");
        }
        showSpinner(false);
    };

    useEffect(() => {
        if (userData.isLogged) getFavoritesCompanys();
        // eslint-disable-next-line
    }, [userData.isLogged]);

    return (
      <main className="dashboardMain">
        <NavBarDash />
        <button
          className="dashboardCloseBtn"
          onClick={() => {
            const previousSaved = localStorage.getItem("previousPathToDash");
            previousSaved
              ? navigate(localStorage.getItem("previousPathToDash"))
              : navigate("/");
          }}
        >
          Salir
        </button>

        <section className="favoritosSection">
          <div>
            <h1 className="tituloFavoritos">Favoritos</h1>
          </div>
          <div className="favoritosGrid">
            {favoritesCompanys.length > 0 ? (
              favoritesCompanys
            ) : (
              <p className="noResults">No hay resultados</p>
            )}
          </div>
        </section>
      </main>
    );
};

export default Favoritos;
