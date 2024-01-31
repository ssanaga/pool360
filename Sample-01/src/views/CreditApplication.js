import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../css/Form.css';
import Invitation from "../components/InviteToCompany";
const authConfig = require("../auth_config.json");

const Form = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [formData, setFormData] = useState({
        ssn: '',
        company: '',
        role: ''
    });
    const [applicationStatus, setApplicationStatus] = useState(null); // Track the application status
    const [isLoading, setIsLoading] = useState(true);


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
        const getUserMetadata = async () => {
            setIsLoading(true);
            try {
                const token = await fetchToken();
                const response = await fetch(`https://${authConfig.domain}/api/v2/users/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = await response.json();

                setApplicationStatus(userData.user_metadata?.application || 'not submitted');

            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const updatedData = {
                ...formData,
                application: 'submitted'
            };
            const token = await fetchToken();
            const response = await fetch(`https://${authConfig.domain}/api/v2/users/${user.sub}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_metadata: updatedData
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            alert('Profile and application status updated successfully');
        } catch (error) {
            console.error('Error updating profile and application status:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(`Application status ${applicationStatus}`)
    if (applicationStatus === 'approved') {
        return <Invitation></Invitation>;

    }

    if (applicationStatus === 'pending' || applicationStatus === 'submitted') {
        return <div style={{ color: 'orange' }}>Your application is pending approval.</div>;
    }


    return (
        <div className="form-container" >
            <img src="https://devpoolcorpb2cstorage.blob.core.windows.net/poolcorpid/assets/images/pool360Icon.svg"
                alt="Pool Icon"
                className="form-icon" />
            <div>
                You can browse our eCommerce Site <a href={authConfig.eCommerceapp} target="_blank" rel="noopener noreferrer">Submit the application to Shop Here</a>
            </div>
            <form onSubmit={handleSubmit} className="user-form">
                <label>
                    SSN:
                    <input type="text" name="ssn" value={formData.ssn} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Company:
                    <input type="text" name="company" value={formData.company} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Role:
                    <input type="text" name="role" value={formData.role} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>

            </form>
        </div>
    );

};

export default Form;



