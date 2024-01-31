import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../css/Form.css';
const authConfig = require("../auth_config.json");



const InviteToCompany = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [email, setEmail] = useState('');

    const [userDetails, setUserDetails] = useState({ webKey: '', accountNumber: '', organizationName: '', userRole: '' });

    const fetchToken = async () => {
        try {
            const response = await fetch('https://express-server-smoky.vercel.app/api/token');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.access_token;

        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };


    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const token = await fetchToken();
                const userDetailsUpdate = {};
                const response = await fetch(`https://${authConfig.domain}/api/v2/users/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = await response.json();

                userDetailsUpdate.ownername = userData.name;
                userDetailsUpdate.webKey = userData.user_metadata?.webKey || 'Not Available';
                userDetailsUpdate.accountNumber = userData.user_metadata?.accountNumber || 'Not Available';

                // Fetch organization details
                const orgResponse = await fetch(`https://${authConfig.domain}/api/v2/users/${user.sub}/organizations`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const orgData = await orgResponse.json();

                if (orgData.length > 0) {
                    userDetailsUpdate.organizationName = orgData[0].name;
                    userDetailsUpdate.organizationId = orgData[0].id;
                }

                // Fetch roles
                const rolesResponse = await fetch(`https://${authConfig.domain}/api/v2/organizations/${orgData[0].id}/members/${user.sub}/roles`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const rolesData = await rolesResponse.json();
                if (rolesData.length > 0) {

                    userDetailsUpdate.userRole = rolesData.map(role => role.name).join(', ');
                }

                setUserDetails(userDetailsUpdate);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        getUserDetails();
    }, [getAccessTokenSilently, user?.sub]);

    //Need to test
    const handleInvite = async (event) => {
        event.preventDefault();

        try {
            const token = await fetchToken();
            const organizationId = userDetails.organizationId;// Replace with your Auth0 organization ID
            const inviteUrl = `https://${authConfig.domain}/api/v2/organizations/${organizationId}/invitations`;

            const response = await fetch(inviteUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: `${authConfig.clientId}`, // Replace with your Auth0 client ID
                    invitee: {
                        email: email,
                    },
                    inviter: {
                        "name": userDetails.ownername
                    },
                    roles: ['rol_ITznh611PBIDyGVn'], // This should be the ID of the role, not just a name
                    "user_metadata": {
                        "accountNumber": userDetails.accountNumber,
                        "webKey": userDetails.webKey,
                        "application": "approved"
                    },
                    connection_id: "con_JtCGXWbOuyqRapbs"
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            alert('Invitation sent successfully');
        } catch (error) {
            console.error('Error sending invitation:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-header">Your application is approved, start shopping.</h2>
            <p>As you are an owner, you can invite others to the company.</p>
            <div>
                <strong>Web Key:</strong> {userDetails.webKey}<br />
                <strong>Account Number:</strong> {userDetails.accountNumber}<br />
                <strong>Organization:</strong> {userDetails.organizationName}<br />
                <strong>Role:</strong> {userDetails.userRole}
            </div>
            <div>
                You can start shopping at our eCommerce Site <a href={authConfig.eCommerceapp} target="_blank" rel="noopener noreferrer">Visit our Shop</a>
            </div>

            {
                userDetails.userRole.includes('organization_admin') && (
                    <form onSubmit={handleInvite} className="user-form">
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                        </label>
                        <br />
                        {/* Uncomment and use the Role ID field if needed */}
                        {/* <label>
                    Role ID:
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="form-input" />
                </label>
                <br /> */}
                        <button type="submit" className="form-button">Send Invitation</button>
                    </form>
                )
            }
        </div >
    );

};

export default InviteToCompany;
