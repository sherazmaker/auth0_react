const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-sheraz.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "Auth0 identifier",
  issuer: "https://dev-sheraz.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(verifyJwt);

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

app.get("/private", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-sheraz.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userInfo = response.data;
    console.log(userInfo);
    res.send(userInfo);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/protected", (res, req) => {
  res.send("Server is Running...");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`Server is started at http://localhost:5000`);
});
