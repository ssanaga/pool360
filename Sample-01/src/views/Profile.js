import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [decodedAccessToken, setDecodedAccessToken] = useState({});
  const [decodedIdToken, setDecodedIdToken] = useState({});

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const idTokenClaims = await getIdTokenClaims();
        setAccessToken(accessToken);
        setIdToken(idTokenClaims.__raw);

        // Decode tokens
        setDecodedAccessToken(decodeJwtPayload(accessToken));
        setDecodedIdToken(decodeJwtPayload(idTokenClaims.__raw));

      } catch (e) {
        console.error(e);
      }
    };

    fetchTokens();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  // Function to decode JWT payload
  const decodeJwtPayload = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding token: ", e);
      return {};
    }
  };

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
      {/* Display decoded tokens */}
      <Row>
        <Col>
          <h3>Decoded Tokens</h3>
          <Highlight>{`Decoded Access Token: ${JSON.stringify(decodedAccessToken, null, 2)}`}</Highlight>
          <Highlight>{`Decoded ID Token: ${JSON.stringify(decodedIdToken, null, 2)}`}</Highlight>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
