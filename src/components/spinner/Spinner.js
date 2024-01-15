// https://www.npmjs.com/package/react-spinners
// https://www.davidhu.io/react-spinners/
import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import FadeLoader from "react-spinners/FadeLoader";
import "./spinner.css";

const Spinner = () => {
    return (
        <div className="contSpinners flex">
            <PuffLoader color="green" size={100}/>
        </div>
    );
}

const ImageSpinner = () => {
    return (
        <div className="imageSpinner flex">
            <FadeLoader color="#3d348b"/>
        </div>
    );
}

export {Spinner, ImageSpinner};