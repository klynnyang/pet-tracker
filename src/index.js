import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App/App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("root")
);
