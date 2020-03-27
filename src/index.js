import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import * as firebase from "firebase/app";

import "./index.css";
import "typeface-roboto";

// <!-- The core Firebase JS SDK is always required and must be listed first -->
{/* <script src="https://www.gstatic.com/firebasejs/7.13.0/firebase-app.js"></script>; */}

// <!-- TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries -->

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBrKqiv8eOkxryttvYOFBtONwuz2adgR2w",
  authDomain: "projectile-aa119.firebaseapp.com",
  databaseURL: "https://projectile-aa119.firebaseio.com",
  projectId: "projectile-aa119",
  storageBucket: "projectile-aa119.appspot.com",
  messagingSenderId: "504500813953",
  appId: "1:504500813953:web:12168df02b01556e4e0d80"
};
//  Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("root")
);
