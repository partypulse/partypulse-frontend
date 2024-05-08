import React, {useState} from "react";
import api from "../../api/api.js";
import {useNavigate} from "react-router-dom";


function LoginPage() {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {

        api.post('/login', { email, password })
            .then(response => {
                const token = response.data.token;
                const _userId = response.data._userId
                localStorage.setItem('token', token);
                localStorage.setItem('_userId', _userId);

                window.alert("Successful login! :) ")
               navigate('/settings')
            })
            .catch(error => {
                setError('Invalid email or password');
            });
    };


    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPage;
