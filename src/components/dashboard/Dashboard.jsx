import React, { useState, useEffect, useContext } from "react";
import "./dashboard.css";
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
    const [userInfo, setUserInfo] = useState({name: "", avatarImageSrc: ""});
    const [recommendedCompanys, setRecommendedCompanys] = useState([]);
    const [listOfReviews, setListOfReviews] = useState([]);
    const [viewAllReviews, setViewAllReviews] = useState(false);

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

    const deleteCompanysOfVisitedDataIfNotExists = async (companysInDBVisitedArr) => {                              //companysInDBVisitedArr: negocios en lista de visitados
        try {
            const companysVisitedIdsArr = companysInDBVisitedArr.map((companysVisited) => companysVisited.companyid);
            const queryJSON = JSON.stringify({ _id: { $in: companysVisitedIdsArr } });      
            const fieldsSelected = "_id";
            const mostVisitedCompanysResponse = await findCompanys2(queryJSON, fieldsSelected);
            const companysIdsThatExistArr = mostVisitedCompanysResponse.companysData.map((company) => company._id);      //Negocios que estan publicados (que existen) 
            const indexsOfCompanysToDeleteArr = [];
            companysVisitedIdsArr.forEach((companyVisited, index) => {
                if (!companysIdsThatExistArr.includes(companyVisited)) indexsOfCompanysToDeleteArr.push(index);
            })
            indexsOfCompanysToDeleteArr.forEach(async (companyIndexToDelete) => {
                const companyIdToDelete = companysVisitedIdsArr[companyIndexToDelete];
                const response = await editUserByQuery(
                    {email: userData.email},
                    { $pull: { visited: { companyid: companyIdToDelete } } }             
                );
                console.log(response);
            })    
        }  catch {
            console.log("Error al eliminar negocios visitados que no existen");
        }
    }
    
    useEffect(() => {
        
        if (!userData.email) return;

        const loadLastCompanysVisitedData = async () => {
            const lastCompanysVisitedDataResponse = await findUser("email", userData.email, "visited");

            if (lastCompanysVisitedDataResponse.success && lastCompanysVisitedDataResponse.userData.visited.length) {

                await deleteCompanysOfVisitedDataIfNotExists(lastCompanysVisitedDataResponse.userData.visited);             //Elimina negocios que ya no existen en los datos de usuario

                const lastCompanysVisitedDataArr = lastCompanysVisitedDataResponse.userData.visited;
                const lastCompanysVisitedDataArrSortedByVisitesCount = lastCompanysVisitedDataArr.sort((a, b) => b.visitscount - a.visitscount);        //Ordenamos por mas visitados a menos visitados
                const maxVistedCount = lastCompanysVisitedDataArrSortedByVisitesCount[0].visitscount;                                                   //Obtenemos los elementos que tienen el numero maximo de vositados
                let maxVisitedCountElementsArr = lastCompanysVisitedDataArrSortedByVisitesCount.filter((vistedData) => vistedData.visitscount === maxVistedCount);
                if (maxVisitedCountElementsArr.length >= 4) {                                                                                            //Si son mas de 4 los ordenamos por la ultima visita
                    maxVisitedCountElementsArr = maxVisitedCountElementsArr.sort((a, b) => b.lastvisit - a.lastvisit);
                } else {
                    maxVisitedCountElementsArr = lastCompanysVisitedDataArrSortedByVisitesCount.slice(0, 4);
                }
                
                const queryJSON = JSON.stringify({ _id: { $in: maxVisitedCountElementsArr.map((visitedData) => visitedData.companyid) } });      
                const fieldsSelected = "name images.images vefrek_website";
                const mostVisitedCompanysResponse = await findCompanys2(queryJSON, fieldsSelected);

                if (mostVisitedCompanysResponse.success) {
                    const mostVisitedCompanysArrFromDB = mostVisitedCompanysResponse.companysData;
                    let mostVisitedCompanysArrOrdered = [];
                    
                    maxVisitedCountElementsArr.forEach((vistedData) => {                                        //Usamos el forEach para que el orden de los elementos obtenidos de la BDD coincida 
                        mostVisitedCompanysArrOrdered.push(mostVisitedCompanysArrFromDB.find((company) => company._id === vistedData.companyid))    //con el de "maxVisitedCountElementsArr" que generamos antes
                    })
   
                    const activitDataJSX = mostVisitedCompanysArrOrdered.map((company, index) => 
                        <Link key = { index } className = "col mb-4" to={`/${company.vefrek_website}`}>
                            <div className={`image-container img-${index + 1}`}>
                                <img
                                    src={company.images.images[0].url}
                                    alt={"company" + company._id}
                                    className="img-fluid"
                                />
                                <div className="overlay">
                                    <h3 className="text-white">{company.name}</h3>
                                </div>
                            </div>
                        </Link >
                    )
                    setActivityData(activitDataJSX);
                } else {
                    console.error(mostVisitedCompanysResponse.message);
                }
            } else if (lastCompanysVisitedDataResponse.success && !lastCompanysVisitedDataResponse.userData.visited.length) {
                setActivityData("Todavía no has consultado negocios")
            } else {
                console.error(lastCompanysVisitedDataResponse.message);
            }   
        }

        loadLastCompanysVisitedData();

        /******************************************************************************/

        (async() => {                                                                                                   //Cargamos info de usuario: Nombre e imagen de perfil
            const response = await findUser("email", userData.email, "name avatar.url");
            if (!response.success) {
                setUserInfo({name: "Nombre no disponible", avatarImageSrc: "/images/user.png"})
                return;
            };
            const userInfo = response.userData;
            setUserInfo({name: userInfo.name, avatarImageSrc: userInfo.avatar.url})
        })();

        /******************************************************************************/

        (async() => {                                                                                //Carga negocios recomendados   
            const matchJSON = JSON.stringify({});                                                    //Busca todos los negocios
            
            const aggregateQueryJSON = JSON.stringify([
                { $sample: { size: 3 } },                                                            //Elige solo 3 al azar
                {
                    $project: {                                                                      //Campos que queremos       
                        name: 1,
                        "images": 1,
                        "avatar.url": 1,
                        "subcategory": 1,
                        "vefrek_website": 1,
                    },
                },
            ]);                                                                                     
            const response = await findCompanys(matchJSON, aggregateQueryJSON);
            const recommendedCompanysArr = response.companysData;
            const recommendedCompanysJSXArr = recommendedCompanysArr.map((company) => 
                <Link className="card" to={`/${company.vefrek_website}`}>
                    <div className="card-user-info">
                        <img
                            src={company.images.logo.url}
                            alt="Avatar"
                        />
                        <h2>{company.name}</h2>
                    </div>
                    <img
                        className="card-img"
                        src={company.images.images[0].url}
                        alt="Negocio"
                    />
                    <p>{recommendedTexts[company.subcategory][Math.floor(Math.random() * recommendedTexts[company.subcategory].length)]}</p>
                </Link>
            )
            setRecommendedCompanys(recommendedCompanysJSXArr);
        })();

        (async () => {
            const mathQueryJSON = JSON.stringify({ registeremail: userData.email });                        //Setea comentarios
            const aggregateQueryJSON = JSON.stringify([{ $project: { name: 1, reviews: 1} }]);

            const responseOBJ = await findCompanys(mathQueryJSON, aggregateQueryJSON);
            
            if (responseOBJ.success && responseOBJ.companysData) {
                const companysDataArr = responseOBJ.companysData;

                companysDataArr.forEach((company) => {                                                     //Agregamos el nombre de la empresa calificada en reviews
                    company.reviews.forEach((review) => {
                        review.companyName = company.name;
                    })
                })
                  
                let totalReviewsArr = [];
                
                companysDataArr.forEach((company) => {
                    totalReviewsArr = totalReviewsArr.concat(company.reviews);
                });
                           
                setListOfReviews(
                    totalReviewsArr.map((review) => 
                        < div className="notifi-item mb-3" >
                            <div className="text">
                                <h5>{review.companyName}</h5>
                                <h4>{review.name} {"⭐⭐⭐⭐⭐".substring(0, review.numberOfStars)}</h4>
                                <p>
                                    {review.comment}
                                </p>
                            </div>
                        </div >
                    )
                )
                                
            } 
        })();

        // eslint-disable-next-line 
    }, [userData.email])
                   
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
                className="btn dashboardClose"
                onClick={() => {
                    const previousSaved = localStorage.getItem("previousPathToDash");
                    previousSaved
                        ? navigate(localStorage.getItem("previousPathToDash"))
                        : navigate("/");
                }}
            >
                Salir
            </button>

            <section className="content">
                <div className="left-content">
                    <div className="container col-xl-12">
                        <div className="row fila1">
                            <div className="col-md-12">
                                <div className="mas-consultados">
                                    <h1>Negocios más consultados</h1>
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                                        {activityData}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row fila2">
                                <div className="col-xl-12 order-md-1 order-2">
                                    <div className="left-bottom">
                                        <div className="descuentos">
                                            <h1 className="mb-4">Próximos descuentos</h1>
                                            <div>
                                                {scheduleData.map((item, index) => (
                                                    <div key={index} className="prox-desc mb-3">
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
                                </div>
                                <div className="col-xl-12 order-md-2 order-1 mt-5">
                                    <div className="notifi-box" id="box">
                                        <h2>
                                            Comentarios recibidos
                                            <span className="badge bg-secondary">{listOfReviews.length}</span>
                                        </h2>
                                        <div className="comentarios-container">
                                            {!viewAllReviews && listOfReviews.slice(0, 3)}
                                            {viewAllReviews && listOfReviews}
                                        </div>
                                    </div>
                                    {listOfReviews.length > 3 && !viewAllReviews && <h5 className="p-3" style={{cursor: "pointer"}} onClick={() => setViewAllReviews(true)}>Ver más comentarios...</h5>}
                                    {listOfReviews.length > 3 && viewAllReviews && <h5 className="p-3" style={{cursor: "pointer"}} onClick={() => setViewAllReviews(false)}>Ver menos...</h5>}            
                                </div>
                            </div>
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
                                <div className="user-info mt-4">
                                    <img src={userInfo.avatarImageSrc} alt="user" />
                                </div>
                            </div>
                            <div>
                                <div className="user-info"></div>
                            </div>
                        </div>

                        <div className="recomendaciones mt-4">
                            <h1>Recomendaciones</h1>
                            <div className="card-container">
                                {recommendedCompanys}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
