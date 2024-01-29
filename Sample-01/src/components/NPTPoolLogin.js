import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function NPTPoolLogin() {



    // Event handler for clicking the link
    const handleLoginClick = (event) => {
        event.preventDefault(); // Prevent the default anchor behavior

        // Redirect to the specified URL
        // window.location.href = 'https://nptpool.vercel.app/profile';
        window.location.href = 'http://localhost:5000/profile';
    };

    return (
        <div>
            <img src="https://www.nptpool.com/images/npt-logo.svg" // Replace with the actual path or URL
                alt="NPTPool Logo" className="fill-current h-8 w-8 mr-2" // Adjust the class names as needed width="49"
                height="54" />
            {/* <b><a href="https://nptpool.vercel.app/profile" onClick={handleLoginClick}>Login with NPT Pool</a></b> */
                <b><a href="http://localhost:5000/profile" onClick={handleLoginClick}>Login with NPT Pool</a></b>}
        </div>
    );
}

export default NPTPoolLogin;
