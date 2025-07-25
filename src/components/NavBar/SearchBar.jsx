import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";
import "../../styles/Navbar/SearchBar.css";

export default function SearchBar() {
    const [results, setResults] = useState(null);
    const companyFullCollection = useRef();
    const resultsContRef = useRef();

    const findData = () => {
        const resultsCont = resultsContRef.current;
        const inputSearch = document.querySelector(".searchBar-searchInput");
        const inputSearchArr = inputSearch.value.split(" ");

        if (inputSearch.value.length > 2) {
            const resultsArr = companyFullCollection.current.filter((company) =>
                inputSearchArr.every((word) =>
                    JSON.stringify(company)
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .includes(
                            word
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                        )
                )
            );
            resultsArr.length === 0
                ? (resultsCont.style.opacity = 0)
                : (resultsCont.style.opacity = 1);
            const resultsJSX = resultsArr.map((result) => (
                <Link
                    key={result._id}
                    to={`/${result.vefrek_website}`}
                    onClick={(e) => {
                        inputSearch.value = "";
                        e.target.parentNode.style.opacity = 0;
                    }}
                    className="searchBar-searchResult"
                >
                    {`${result.subcategory} - ${result.name} - ${result.location} - ${result.city} - ${result.state}`}
                </Link>
            ));
            setResults(resultsJSX);
        } else {
            setResults(null);
            resultsCont.style.opacity = 0;
        }
    };
 
    const getcompanysFullCollection = async () => {
        const matchJSON = JSON.stringify({});
        const aggregateQueryJSON = JSON.stringify([
            {
                $project: {
                    name: 1,
                    location: 1,
                    city: 1,
                    state: 1,
                    postal_code: 1,
                    phone: 1,
                    phone2: 1,
                    website: 1,
                    category: 1,
                    subcategory: 1,
                    description: 1,
                    vefrek_website: 1,
                },
            },
        ]);
        const response = await findCompanys(matchJSON, aggregateQueryJSON);
        if (response.success && response.companysData) {
            companyFullCollection.current = response.companysData;
        }
    };

    useEffect(() => {
        getcompanysFullCollection();

        /***********************************************/ 
        
        const searchBarResultsContainer = document.querySelector(".searchBar-resultsContainer");
        const searchBarSearchInput = document.querySelector(".searchBar-searchInput");
        const searchBarSearchInputWidth = searchBarSearchInput.offsetWidth;
        searchBarResultsContainer.style.transform = `translateX(calc(-50% + ${searchBarSearchInputWidth / 2}px))`;
         
    }, []);

    return (
        <div className="searchBar-container">
            <input
                onChange={findData}
                type="text"
                name="buscar"
                id="buscar"
                size="35"
                placeholder="Buscar..."
                className="searchBar-searchInput"
            />
            <div className="searchBar-resultsContainer flex column" ref={resultsContRef}>
                {results}
            </div>
        </div>
    );
}
