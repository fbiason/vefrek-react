import React from "react";
import "../../styles/style.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../components/spinner/Spinner";

const LoginUser = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    window.location = "/";
  }, []);

  return (
    <div className="loginUserCont">
      <Spinner />
    </div>
  );
};

export default LoginUser;
