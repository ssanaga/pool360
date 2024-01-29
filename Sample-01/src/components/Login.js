import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
function Login() {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const invitation = searchParams.get('invitation');
    const organization = searchParams.get('organization');

    const options = {};
    if (invitation && organization) {
      options.organization = organization;
      options.invitation = invitation;
    }

    loginWithRedirect({ authorizationParams: { organization, invitation } });
  }, [location, loginWithRedirect]);
  return (
    <div>

    </div>
  );
}
export default Login;