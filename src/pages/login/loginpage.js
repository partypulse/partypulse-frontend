import React, {useState} from "react";
import api from "../../api/api.js";


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        api.post('/login', { email, password })
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                window.alert("Successful login! :) ")
                // Redirect the user to the homepage or dashboard
                // You can use React Router for this purpose
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
