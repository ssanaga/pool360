const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");
const authConfig = require("./src/auth_config.json");
const axios = require('axios');

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = `http://localhost:${appPort}`;

console.log(`App origin ${appOrigin}`)

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: `${appOrigin}` }));

const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.get('/api/token', async (req, res) => {
  try {
    const tokenResponse = await axios.post(`https://${authConfig.domain}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: authConfig.clientcredentialClientId,        // from your auth_config.json or environment variables
      client_secret: authConfig.clientcredentialClientSecret // from your auth_config.json or environment variables

    });

    res.json(tokenResponse.data);
  } catch (error) {
    console.error('Error fetching Auth0 token', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
