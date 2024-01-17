import "./searchBar.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";

export default function SearchBar() {

    const [results, setResults] = useState(null);
    const companyFullCollection = useRef();
    const resultsRef = useRef();

    const findData = () => {
        const resultsCont = document.querySelector(".resultsCont");
        const inputSearch = document.querySelector(".search_navbar");
        const inputSearchArr = inputSearch.value.split(" ");

        if (inputSearch.value.length > 1) {
            const resultsArr = companyFullCollection.current.filter((company) =>
                inputSearchArr.every((word) =>
                    JSON.stringify(company).toLowerCase().includes(word.toLowerCase())
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
                    className="searchResult"
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

    const setSearchResultsStyle = () => {
        setTimeout(() => {
            const resultsCont = document.querySelector(".resultsCont");
            const toLeft = resultsCont.getBoundingClientRect().left;
            if (
                window.innerHeight > window.innerWidth &&                   //Portrait
                resultsRef.current &&
                resultsRef.current.length > 0
            ) {
                if (toLeft) resultsCont.style.transform = `translateX(-${toLeft}px)`;
                resultsCont.style.maxWidth = "100vw";
            } else if (                                                     //landscape
                window.innerHeight < window.innerWidth &&
                resultsRef.current &&
                resultsRef.current.length > 0
            ) {
                resultsCont.style.maxWidth = `calc(100vw - 17px - ${toLeft}px)`;
                resultsCont.style.transform = `unset`;
            }
        }, 100);
    };

    useEffect(() => {
        resultsRef.current = results;
        setSearchResultsStyle();
        // eslint-disable-next-line
    }, [results]);

    const getcompanysFullCollection = async () => {
        const response = await findCompanys(
            JSON.stringify({ $or: [{ play: true }, { play: { $exists: false } }] }),
            "name location city state postal_code phone phone2 website category subcategory description vefrek_website"
        );
        if (response.success && response.companysData) {
            companyFullCollection.current = response.companysData;
        }
    };

    useEffect(() => {
        window.addEventListener("orientationchange", setSearchResultsStyle);
        setSearchResultsStyle();
        getcompanysFullCollection();
    }, []);

    return (
        <div className="searchBarCont">
            <input
                onChange={findData}
                type="text"
                name="buscar"
                id="buscar"
                size="35"
                placeholder="Buscar..."
                className="form-control search_navbar"
            />
            <div className="resultsCont flex column">{results}</div>
        </div>
    )
}
