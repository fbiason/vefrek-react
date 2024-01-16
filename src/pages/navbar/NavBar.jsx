import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect } from "react";
import Swiper from "swiper";
import Isotope from "isotope-layout";
import AOS from "aos";
// import GLightbox from "glightbox";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import Dropdown from "../dropdown/Dropdown";
import { findCompanys } from "../../utils/apiDb/apiDbAcions";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, show } = useContext(UserContext);
  const [results, setResults] = useState(null);
  const resultsRef = useRef();
  const companyFullCollection = useRef();

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
      if (
        window.innerHeight > window.innerWidth &&
        resultsRef.current &&
        resultsRef.current.length > 0
      ) {
        const toLeft = resultsCont.getBoundingClientRect().left;
        if (toLeft) resultsCont.style.transform = `translateX(-${toLeft}px)`;
      } else if (
        window.innerHeight < window.innerWidth &&
        resultsRef.current &&
        resultsRef.current.length > 0
      ) {
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
    getcompanysFullCollection();

    /***************************** CORRIGE ERROR DE REDIRECCION AL LOGUEARSE CON FACEBOOK -NO BORRAR* */

    if (window.location.hash.includes("_=_")) {
      navigate("/");
    }

    /***************************************************************************************************/

    (function () {
      /**
       * Easy selector helper function
       */
      const select = (el, all = false) => {
        el = el.trim();
        if (all) {
          return [...document.querySelectorAll(el)];
        } else {
          if (el) return document.querySelector(el);
        }
      };

      /**
       * Easy event listener function
       */
      const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
          if (all) {
            selectEl.forEach((e) => e.addEventListener(type, listener));
          } else {
            selectEl.addEventListener(type, listener);
          }
        }
      };

      /**
       * Easy on scroll event listener
       */
      const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
      };

      /**
       * Navbar links active state on scroll
       */
      let navbarlinks = select("#navbar .scrollto", true);
      const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
          if (!navbarlink.hash) return;
          let section = select(navbarlink.hash);
          if (!section) return;
          if (
            position >= section.offsetTop &&
            position <= section.offsetTop + section.offsetHeight
          ) {
            navbarlink.classList.add("active");
          } else {
            navbarlink.classList.remove("active");
          }
        });
      };
      window.addEventListener("load", navbarlinksActive);
      onscroll(document, navbarlinksActive);

      /**
       * Scrolls to an element with header offset
       */
      const scrollto = (el) => {
        let header = select("#header");
        let offset = header.offsetHeight;

        let elementPos = select(el).offsetTop;
        window.scrollTo({
          top: elementPos - offset,
          behavior: "smooth",
        });
      };

      /**
       * Toggle .header-scrolled class to #header when page is scrolled
       */
      let selectHeader = select("#header");
      if (selectHeader) {
        const headerScrolled = () => {
          if (window.scrollY > 100) {
            selectHeader.classList.add("header-scrolled");
          } else {
            selectHeader.classList.remove("header-scrolled");
          }
        };
        window.addEventListener("load", headerScrolled);
        onscroll(document, headerScrolled);
      }

      /**
       * Back to top button
       */
      let backtotop = select(".back-to-top");
      if (backtotop) {
        const toggleBacktotop = () => {
          if (window.scrollY > 100) {
            backtotop.classList.add("active");
          } else {
            backtotop.classList.remove("active");
          }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
      }

      /**
       * Mobile nav toggle
       */
      on("click", ".mobile-nav-toggle", function (e) {
        select("#navbar").classList.toggle("navbar-mobile");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      });

      /**
       * Mobile nav dropdowns activate
       */
      on(
        "click",
        ".navbar .dropdown > a",
        function (e) {
          if (select("#navbar").classList.contains("navbar-mobile")) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle("dropdown-active");
          }
        },
        true
      );

      /**
       * Scrool with ofset on links with a class name .scrollto
       */
      on(
        "click",
        ".scrollto",
        function (e) {
          if (select(this.hash)) {
            e.preventDefault();

            let navbar = select("#navbar");
            if (navbar.classList.contains("navbar-mobile")) {
              navbar.classList.remove("navbar-mobile");
              let navbarToggle = select(".mobile-nav-toggle");
              navbarToggle.classList.toggle("bi-list");
              navbarToggle.classList.toggle("bi-x");
            }
            scrollto(this.hash);
          }
        },
        true
      );

      /**
       * Scroll with ofset on page load with hash links in the url
       */
      window.addEventListener("load", () => {
        if (window.location.hash) {
          if (select(window.location.hash)) {
            scrollto(window.location.hash);
          }
        }
      });

      /**
       * Preloader
       */
      let preloader = select("#preloader");
      if (preloader) {
        window.addEventListener("load", () => {
          preloader.remove();
        });
      }

      /**
       * Clients Slider
       */
      new Swiper(".clients-slider", {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
          992: {
            slidesPerView: 6,
            spaceBetween: 120,
          },
        },
      });

      /**
       * Porfolio isotope and filter
       */
      window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
          let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: ".portfolio-item",
          });

          let portfolioFilters = select("#portfolio-flters li", true);

          on(
            "click",
            "#portfolio-flters li",
            function (e) {
              e.preventDefault();
              portfolioFilters.forEach(function (el) {
                el.classList.remove("filter-active");
              });
              this.classList.add("filter-active");

              portfolioIsotope.arrange({
                filter: this.getAttribute("data-filter"),
              });
              portfolioIsotope.on("arrangeComplete", function () {
                AOS.refresh();
              });
            },
            true
          );
        }
      });

      /**
       * Initiate portfolio lightbox
       */
      // const portfolioLightbox = GLightbox({
      //     selector: ".portfolio-lightbox",
      // });

      /**
       * Portfolio details slider
       */
      new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });

      /**
       * Testimonials slider
       */
      new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });

      /**
       * Animation on scroll
       */
      window.addEventListener("load", () => {
        AOS.init({
          duration: 1000,

          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      });
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <header id="header" className="fixed-top">
      <div className="row align-items-center justify-content-center">
        {/* Logo */}
        <div className="col-lg-4 col-md-12 mb-3 mb-lg-0 text-center">
          <Link to="/">
            <img
              src="/images/logos/logo-vefrek.png"
              alt="Logo Vefrek"
              className="img-fluid"
            />
          </Link>
        </div>

        {/* Barra de Búsqueda, Ingresa, Publica Ahora */}
        <div className="col-lg-8 col-md-12">
          <div className="row align-items-center">
            {/* Barra de Búsqueda */}
            <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center searchBarCont">
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

            <div className="col-md-4 mb-3 mb-md-0 justify-content-center">
              {" "}
              <ul className="d-flex justify-content-center p-0">
                <li>{userData.isLogged && show && <Dropdown />}</li>
                {!userData.isLogged && show && (
                  <Link to="/login" className="nav-link scrollto">
                    Ingresa
                  </Link>
                )}
              </ul>
            </div>

            {/* Publica Ahora */}
            <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center">
              <Link
                to="/publicacion"
                className="btn btn-primary get-started-btn scrollto"
              >
                ¡PUBLICA AHORA!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
