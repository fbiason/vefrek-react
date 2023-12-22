import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <NextUIProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NextUIProvider>
  </UserProvider>
);
