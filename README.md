Vefrek 1.0.1

Tareas a realizar:

- Section: Negocios Recomendados.
- Counts: números
- Preium: img fondo
- Urls
- Registro Usuario.
- Política Privacidad
- Términos y Condiciones
- Carga negocios (tipo ecommerce)
- Scroll up
- Mail

//=======================//

/\*--------------------------------------------------------------

# Back to top button

--------------------------------------------------------------\*/
.back-to-top {
position: fixed;
visibility: hidden;
opacity: 0;
right: 15px;
bottom: 15px;
z-index: 996;
background: #14ba75;
width: 40px;
height: 40px;
border-radius: 4px;
transition: all 0.4s;
}

.back-to-top i {
font-size: 28px;
color: #151515;
line-height: 0;
}

.back-to-top:hover {
background: #151515;
}

.back-to-top:hover i {
color: #14ba75;
}

.back-to-top.active {
visibility: visible;
opacity: 1;
}
/\_--------------------------------------------------------------

# Navigation Menu

--------------------------------------------------------------\*/
/\*\*

- Desktop Navigation
  \*/
  @media (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
  left: -90%;
  }
  .navbar .dropdown .dropdown:hover > ul {
  left: -100%;
  }
  }
  /\*\*
- Mobile Navigation
  \*/
  .mobile-nav-toggle {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
  }

@media (max-width: 991px) {
.mobile-nav-toggle {
display: block;
}
.navbar ul {
display: none;
}
}
.navbar-mobile {
position: fixed;
overflow: hidden;
top: 0;
right: 0;
left: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.9);
transition: 0.3s;
z-index: 999;
}

.navbar-mobile .mobile-nav-toggle {
position: absolute;
top: 15px;
right: 15px;
}

.navbar-mobile ul {
display: block;
position: absolute;
top: 55px;
right: 15px;
bottom: 15px;
left: 15px;
padding: 10px 0;
background-color: #fff;
overflow-y: auto;
transition: 0.3s;
}

.navbar-mobile a,
.navbar-mobile a:focus {
padding: 10px 20px;
font-size: 15px;
color: #151515;
}

.navbar-mobile a:hover,
.navbar-mobile .active,
.navbar-mobile li:hover > a {
color: #151515;
background-color: #14ba75;
}

.navbar-mobile .getstarted,
.navbar-mobile .getstarted:focus {
margin: 15px;
}

.navbar-mobile .dropdown ul {
position: static;
display: none;
margin: 10px 20px;
padding: 10px 0;
z-index: 99;
opacity: 1;
visibility: visible;
background: #fff;
box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
}

.navbar-mobile .dropdown ul li {
min-width: 200px;
}

.navbar-mobile .dropdown ul a {
padding: 10px 20px;
color: #151515;
}

.navbar-mobile .dropdown ul a i {
font-size: 12px;
}

.navbar-mobile .dropdown ul a:hover,
.navbar-mobile .dropdown ul .active:hover,
.navbar-mobile .dropdown ul li:hover > a {
background-color: #14ba75;
}

.navbar-mobile .dropdown > .dropdown-active {
display: block;
}

/_--------------------------------------------------------------
--------------------------------------------------------------_/

code {
font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
monospace;
}

.container {
display: flex;
align-items: center;
justify-content: space-between;
padding: 15px 0;
}

.logo {
margin: 0;
}

input {
margin-left: 20px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
}

nav {
display: flex;
align-items: center;
}

ul {
list-style: none;
margin: 0;
padding: 0;
display: flex;
}

li {
margin-right: 20px;
}

/_ Estilos tipo Bootstrap _/
/_ Corroborar que funcionen perfectamente como en Boostrap 5_/
.align-items-center {
display: flex;
align-items: center;
}

.justify-content-lg-between {
display: flex;
justify-content: space-between;
}

.d-flex {
display: flex;
}

.order-last {
order: 2; /_ o el valor que desees, en este caso 2 para colocar el elemento al final _/
}

.order-lg-0 {
order: 0;
}

.navbar {
padding: 10px 20px; /_ Relleno de la barra de navegación _/
}

.bi {
display: inline-block;
vertical-align: middle;
font-size: 1.5rem; /_ Tamaño del icono, ajusta según sea necesario _/
line-height: 1; /_ Alinea verticalmente el icono _/
/_ Otros estilos según sea necesario _/
}

.bi-list {
display: inline-block;
vertical-align: middle;
font-size: 1.5rem; /_ Tamaño del icono, ajusta según sea necesario _/
line-height: 1; /_ Alinea verticalmente el icono _/
/_ Otros estilos según sea necesario _/
color: #007bff; /_ Color del icono, puedes ajustar el color _/
}

.get-started-btn {
display: inline-block;
padding: 10px 20px;
font-size: 1rem;
text-align: center;
text-decoration: none;
cursor: pointer;
border: none;
border-radius: 5px;
background-color: #007bff; /_ Color de fondo del botón, puedes ajustar el color _/
color: #fff; /_ Color del texto del botón, puedes ajustar el color _/
/_ Otros estilos según sea necesario _/
}
