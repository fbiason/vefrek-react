import React from "react";
import ReactDOM from "react-dom/client";
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
