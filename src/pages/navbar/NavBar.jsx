import React from "react";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import { useEffect } from "react";
import Swiper from "swiper";
import Isotope from "isotope-layout";
import AOS from "aos";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Dropdown from "../dropdown/Dropdown";
import SearchBar from "../../components/searchBar/SearchBar";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData, show } = useContext(UserContext);
  const thisLocation = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    thisLocation.pathname === "/"
      ? setShowSearchBar(false)
      : setShowSearchBar(true); //Oculta la barra de busqueda en home
    window.scrollTo({ top: 0 });
  }, [thisLocation]);

  useEffect(() => {
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

    /******************************* Limpiamos localstorage al salir de la web (pagina previa al dashboard) ***************/

    window.addEventListener("beforeunload", () =>
      localStorage.setItem("previousPathToDash", "")
    );

    // eslint-disable-next-line
  }, []);

  return (
    <header id="header" className="fixed-top">
      <div className="row align-items-center">
        {/* Logo */}
        <div className="col-lg-3 col-md-12 mb-3 mb-lg-0 text-center d-lg-block logo-container">
          <Link to="/">
            <img
              src="/images/logos/logo-vefrek.png"
              alt="Logo Vefrek"
              className="logo-nav"
            />
          </Link>
        </div>

        {/* Barra de Búsqueda */}
        <div className="btnNavs col-12 mb-3 mb-xl-0">
          {showSearchBar && (
            <div className="search-container center-on-mobile">
              {/* Aquí se aplica la clase de centrado en móviles */}
              <SearchBar />
            </div>
          )}
        </div>

        {/* Publica Ahora */}
        <div className="btnNavs col-12 mb-3 mb-xl-0">
          <Link to="/publicacion" className="btn btn-publica">
            ¡PUBLICA AHORA!
          </Link>
        </div>

        {/* Reparación*/}
        <div className="btnNavs col-12 mb-3 mb-xl-0">
          <Link to="/reparacion" className="btn btn-primary btnCategorias">
            Reparación
          </Link>
        </div>

        {/* Venta */}
        <div className="btnNavs col-12 mb-3 mb-xl-0">
          <Link to="/venta" className="btn btn-primary btnCategorias">
            Venta
          </Link>
        </div>

        {/* Otros Servicios */}
        <div className="btnNavs col-12 mb-3 mb-xl-0">
          <Link to="/OtrosServicios" className="btn btn-primary btnCategorias">
            Otros Serv.
          </Link>
        </div>

        {/* Ingresa */}
        <div className="btnNavs col-lg-2 col-12 mb-3 mb-xl-0">
          <ul>
            <li>{userData.isLogged && show && <Dropdown />}</li>
            {!userData.isLogged && show && (
              <Link to="/login" className="ingresa">
                Ingresa
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
