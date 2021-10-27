import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sheraz.us.auth0.com"
      clientId="BKmw1avKtr46AKg28eWRlOua09BNAmaN"
      scope="openid profile email"
      audience="Auth0 identifier"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
