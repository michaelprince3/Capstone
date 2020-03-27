import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import "./index.css";
import 'typeface-roboto';


ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);
