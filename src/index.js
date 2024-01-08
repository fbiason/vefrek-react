import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/vendor/bootstrap/css/bootstrap.min.css"
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "./assets/vendor/boxicons/css/boxicons.min.css"
import "./assets/vendor/glightbox/css/glightbox.min.css"
import "./assets/vendor/remixicon/remixicon.css"
import "./assets/vendor/swiper/swiper-bundle.min.css"
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { SpinnerProvider } from "./context/spinnerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpinnerProvider>
    <UserProvider>
      {/*<React.StrictMode>*/}
      <App /> 
      {/* </React.StrictMode>*/}
    </UserProvider>
  </SpinnerProvider>
);
