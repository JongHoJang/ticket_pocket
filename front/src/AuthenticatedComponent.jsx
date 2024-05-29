import React, {useEffect, useState} from 'react';
import axios from 'axios';

const AuthenticatedComponent = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8081/me', {
            headers: {'x-access-token': token}
        })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('인증 실패', error);
            });
    }, []);

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Info</h2>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default AuthenticatedComponent;
