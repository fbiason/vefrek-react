import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarDash from "./NavBarDash";
import { findUser, findCompanys2 } from "../../utils/apiDb/apiDbAcions";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { editUserByQuery, findCompanys } from "../../utils/apiDb/apiDbAcions";
import { recommendedTexts } from "../../data/recommendedTexts";

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado
  const navigate = useNavigate();
  const thisLocation = useLocation();
  const [activityData, setActivityData] = useState([]);
  const { userData } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({ name: "", avatarImageSrc: "" });
  const [recommendedCompanys, setRecommendedCompanys] = useState([]);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia el estado de isMenuOpen al valor opuesto
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

  const deleteCompanysOfVisitedDataIfNotExists = async (
    companysInDBVisitedArr
  ) => {
    //companysInDBVisitedArr: negocios en lista de visitados
    try {
      const companysVisitedIdsArr = companysInDBVisitedArr.map(
        (companysVisited) => companysVisited.companyid
      );
      const queryJSON = JSON.stringify({ _id: { $in: companysVisitedIdsArr } });
      const fieldsSelected = "_id";
      const mostVisitedCompanysResponse = await findCompanys2(
        queryJSON,
        fieldsSelected
      );
      const companysIdsThatExistArr =
        mostVisitedCompanysResponse.companysData.map((company) => company._id); //Negocios que estan publicados (que existen)
      const indexsOfCompanysToDeleteArr = [];
      companysVisitedIdsArr.forEach((companyVisited, index) => {
        if (!companysIdsThatExistArr.includes(companyVisited))
          indexsOfCompanysToDeleteArr.push(index);
      });
      indexsOfCompanysToDeleteArr.forEach(async (companyIndexToDelete) => {
        const companyIdToDelete = companysVisitedIdsArr[companyIndexToDelete];
        const response = await editUserByQuery(
          { email: userData.email },
          { $pull: { visited: { companyid: companyIdToDelete } } }
        );
        console.log(response);
      });
    } catch {
      console.log("Error al eliminar negocios visitados que no existen");
    }
  };

  useEffect(() => {
    if (!userData.email) return;

    const loadLastCompanysVisitedData = async () => {
      const lastCompanysVisitedDataResponse = await findUser(
        "email",
        userData.email,
        "visited"
      );

      if (
        lastCompanysVisitedDataResponse.success &&
        lastCompanysVisitedDataResponse.userData.visited.length
      ) {
        await deleteCompanysOfVisitedDataIfNotExists(
          lastCompanysVisitedDataResponse.userData.visited
        ); //Elimina negocios que ya no existen en los datos de usuario

        const lastCompanysVisitedDataArr =
          lastCompanysVisitedDataResponse.userData.visited;
        const lastCompanysVisitedDataArrSortedByVisitesCount =
          lastCompanysVisitedDataArr.sort(
            (a, b) => b.visitscount - a.visitscount
          ); //Ordenamos por mas visitados a menos visitados
        const maxVistedCount =
          lastCompanysVisitedDataArrSortedByVisitesCount[0].visitscount; //Obtenemos los elementos que tienen el numero maximo de vositados
        let maxVisitedCountElementsArr =
          lastCompanysVisitedDataArrSortedByVisitesCount.filter(
            (vistedData) => vistedData.visitscount === maxVistedCount
          );
        if (maxVisitedCountElementsArr.length >= 4) {
          //Si son mas de 4 los ordenamos por la ultima visita
          maxVisitedCountElementsArr = maxVisitedCountElementsArr.sort(
            (a, b) => b.lastvisit - a.lastvisit
          );
        } else {
          maxVisitedCountElementsArr =
            lastCompanysVisitedDataArrSortedByVisitesCount.slice(0, 4);
        }

        const queryJSON = JSON.stringify({
          _id: {
            $in: maxVisitedCountElementsArr.map(
              (visitedData) => visitedData.companyid
            ),
          },
        });
        const fieldsSelected = "name images.images vefrek_website";
        const mostVisitedCompanysResponse = await findCompanys2(
          queryJSON,
          fieldsSelected
        );

        if (mostVisitedCompanysResponse.success) {
          const mostVisitedCompanysArrFromDB =
            mostVisitedCompanysResponse.companysData;
          let mostVisitedCompanysArrOrdered = [];

          maxVisitedCountElementsArr.forEach((vistedData) => {
            //Usamos el forEach para que el orden de los elementos obtenidos de la BDD coincida
            mostVisitedCompanysArrOrdered.push(
              mostVisitedCompanysArrFromDB.find(
                (company) => company._id === vistedData.companyid
              )
            ); //con el de "maxVisitedCountElementsArr" que generamos antes
          });

          const activitDataJSX = mostVisitedCompanysArrOrdered.map(
            (company, index) => (
              <Link
                key={index}
                className="custom-column"
                to={`/${company.vefrek_website}`}
              >
                <div className="business-card">
                  <img
                    src={company.images.images[0].url}
                    alt={"company" + company._id}
                    className="custom-image"
                  />
                  <div className="custom-overlay">
                    <h3 className="custom-text">{company.name}</h3>
                  </div>
                </div>
              </Link>
            )
          );
          setActivityData(activitDataJSX);
        } else {
          console.error(mostVisitedCompanysResponse.message);
        }
      } else if (
        lastCompanysVisitedDataResponse.success &&
        !lastCompanysVisitedDataResponse.userData.visited.length
      ) {
        setActivityData("Todavía no has consultado negocios");
      } else {
        console.error(lastCompanysVisitedDataResponse.message);
      }
    };

    loadLastCompanysVisitedData();

    /******************************************************************************/

    (async () => {
      //Cargamos info de usuario: Nombre e imagen de perfil
      const response = await findUser(
        "email",
        userData.email,
        "name avatar.url"
      );
      if (!response.success) {
        setUserInfo({
          name: "Nombre no disponible",
          avatarImageSrc: "/images/user.png",
        });
        return;
      }
      const userInfo = response.userData;
      setUserInfo({ name: userInfo.name, avatarImageSrc: userInfo.avatar.url });
    })();

    /******************************************************************************/

    (async () => {
      //Carga negocios recomendados
      const matchJSON = JSON.stringify({}); //Busca todos los negocios

      const aggregateQueryJSON = JSON.stringify([
        { $sample: { size: 3 } }, //Elige solo 3 al azar
        {
          $project: {
            //Campos que queremos
            name: 1,
            images: 1,
            "avatar.url": 1,
            subcategory: 1,
            vefrek_website: 1,
          },
        },
      ]);
      const response = await findCompanys(matchJSON, aggregateQueryJSON);
      const recommendedCompanysArr = response.companysData;
      const recommendedCompanysJSXArr = recommendedCompanysArr.map(
        (company) => (
          <Link className="card" to={`/${company.vefrek_website}`}>
            <div className="card-user-info">
              <img src={company.images.logo.url} alt="Avatar" />
              <h2>{company.name}</h2>
            </div>
            <img
              className="card-img"
              src={company.images.images[0].url}
              alt="Negocio"
            />
            <p>
              {
                recommendedTexts[company.subcategory][
                  Math.floor(
                    Math.random() * recommendedTexts[company.subcategory].length
                  )
                ]
              }
            </p>
          </Link>
        )
      );
      setRecommendedCompanys(recommendedCompanysJSXArr);
    })();

    // eslint-disable-next-line
  }, [userData.email]);

  const scheduleData = [
    {
      day: "25",
      dayName: "Jueves",
      activity: "2x1 en Autopartes",
      empresa: "YPF",
      participants: [],
    },
    {
      day: "26",
      dayName: "Viernes",
      activity: "Descuento 50% Inifinia",
      empresa: "BiWeb",
      participants: [],
    },
    {
      day: "29",
      dayName: "Lunes",
      activity: "Chapista 30% off",
      empresa: "Biason Automotores",
      participants: [],
    },
  ];

  return (
    <main className="dashboardMain">
      <NavBarDash></NavBarDash>

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

      <section className="content-dash">
        <div className="left-content">
          <div className="consultados-container">
            <div className="consultados-header">
              <h1>Negocios más consultados</h1>
              <div className="consultados-grid">{activityData}</div>
            </div>
          </div>

          <div className="descuentos-container">
            <div className="descuentos-header">
              <h1>Próximos descuentos</h1>
              <div className="descuentos-list">
                {scheduleData.map((item, index) => (
                  <div key={index} className="descuento-item">
                    <div className="day">
                      <h1>{item.day}</h1>
                      <p>{item.dayName}</p>
                    </div>
                    <div className="activity">
                      <h2>{item.activity}</h2>
                      <p>{item.empresa}</p>
                      <div className="participants"></div>
                    </div>
                    <button className="btn-descuentos">Más info</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="notificaciones-container">
            <h2>
              Comentarios recibidos <span className="badge">3</span>
            </h2>
            <div className="comentarios-list">
              <div className="comentario-item">
                <div className="text">
                  <h5>Biason Automotores</h5>
                  <h4>Biason Franco</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Ratione, vel veritatis facilis, enim natus debitis
                    asperiores molestiae alias illo nulla, quaerat optio
                    repellendus! Dolorem temporibus voluptates animi vero soluta
                    illum.
                  </p>
                </div>
              </div>
              <div className="comentario-item">
                <div className="text">
                  <h5>BiWeb</h5>
                  <h4>Ariel Conrado</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptates odio ipsam, iste odit quis velit eius voluptatem
                    rerum error deleniti vero adipisci minima voluptatum unde
                    ex, veniam a quo nisi?
                  </p>
                </div>
              </div>
              <div className="comentario-item">
                <div className="text">
                  <h5>YPF</h5>
                  <h4>Reyes Denis</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni eligendi dicta harum excepturi voluptatem eveniet
                    magnam, temporibus tenetur minima voluptate quo assumenda
                    quia repellendus cumque modi. Placeat consequuntur dolores
                    ea!
                  </p>
                </div>
              </div>
              <h5 className="more-comments">Ver más comentarios...</h5>
            </div>
          </div>
        </div>

        <div className="right-content">
          <div>
            <div className="container-content">
              <div className="user-info">
                <h5>{userInfo.name}</h5>
              </div>
              <div>
                <div className="user-info avatar-section">
                  <img src={userInfo.avatarImageSrc} alt="user" />
                </div>
              </div>
            </div>

            <div className="recomendaciones-section">
              <h1>Recomendaciones</h1>
              <div className="card-container">{recommendedCompanys}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
