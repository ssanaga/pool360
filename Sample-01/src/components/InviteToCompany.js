import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../css/Form.css';

const InviteToCompany = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [email, setEmail] = useState('');

    const [userDetails, setUserDetails] = useState({ webKey: '', accountNumber: '', organizationName: '', userRole: '' });
    const your_auth0_domain = 'poolcorp.authnworld.com';
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8zWGhBVXk1cEsyTDZDekltZGZSTyJ9.eyJpc3MiOiJodHRwczovL3Bvb2xjb3JwLWRlbW8uY2ljLWRlbW8tcGxhdGZvcm0uYXV0aDBhcHAuY29tLyIsInN1YiI6IlhpSU9adkdhZEdsS3NjM0lvZlFQUUgyS21tOFBtOXoyQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Bvb2xjb3JwLWRlbW8uY2ljLWRlbW8tcGxhdGZvcm0uYXV0aDBhcHAuY29tL2FwaS92Mi8iLCJpYXQiOjE3MDY1NDIxMDUsImV4cCI6MTcwNjYyODUwNSwiYXpwIjoiWGlJT1p2R2FkR2xLc2MzSW9mUVBRSDJLbW04UG05ejIiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.FVl1FWmHZsZP-RwinwmJWlWebamE3eFxS5PvaXMORBVM23ItceTuCgqb2jhrYAMNBfPCMO_ZKJFUFlJ-86SzzH57QvIw_wRdpJEsl9zvRLh96cnqA3CJLawMnR7fM6suqHbSg3bkPbX9JKJi7FFzpSpRfz4SoG_1E_jmwErrgOGMWVHn8yPXWB_btNttW8kVGH8mE3fqOzbwFP2LSxz8u8xF9EpqEmnxTFptO88GjPGbEaC3Ubul0ekXdEI_tsBNn-ui6u6UxEDHRUOkQj724clKpZ8zzDf9wBR48QOVDpRUleBNQ8yc9tQNV8D5SRAp5pnGyDFpiV2dbaDmoFlzsQ";

    useEffect(() => {
        const getUserDetails = async () => {
            try {

                const userDetailsUpdate = {};
                const response = await fetch(`https://${your_auth0_domain}/api/v2/users/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = await response.json();

                userDetailsUpdate.ownername = userData.name;
                userDetailsUpdate.webKey = userData.user_metadata?.webKey || 'Not Available';
                userDetailsUpdate.accountNumber = userData.user_metadata?.accountNumber || 'Not Available';

                // Fetch organization details
                const orgResponse = await fetch(`https://${your_auth0_domain}/api/v2/users/${user.sub}/organizations`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const orgData = await orgResponse.json();
                console.log("Org Data", orgData[0].name)
                if (orgData.length > 0) {
                    userDetailsUpdate.organizationName = orgData[0].name;
                    userDetailsUpdate.organizationId = orgData[0].id;
                }

                // Fetch roles
                const rolesResponse = await fetch(`https://${your_auth0_domain}/api/v2/organizations/${orgData[0].id}/members/${user.sub}/roles`, {
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

            const organizationId = userDetails.organizationId;// Replace with your Auth0 organization ID
            const inviteUrl = `https://${your_auth0_domain}/api/v2/organizations/${organizationId}/invitations`;

            const response = await fetch(inviteUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: 'fHnglTLJ7F9WDSJ2RsRn8pwIfHsmiI6I', // Replace with your Auth0 client ID
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
                You can start shopping at our eCommerce Site <a href="http://localhost:5000/profile" target="_blank" rel="noopener noreferrer">Visit our Shop</a>
            </div>

            {<form onSubmit={handleInvite} className="user-form">
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                </label>
                <br />
                {/* <label>
                    Role ID:
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="form-input" />
                </label>
                <br /> */}
                <button type="submit" className="form-button">Send Invitation</button>
            </form>}
        </div>
    );
};

export default InviteToCompany;
