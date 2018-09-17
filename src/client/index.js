import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./js/containers/AppContainer";

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<AppContainer />, wrapper) : false;