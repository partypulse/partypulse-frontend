import React, {useState} from "react";
import api from "../../api/api.js";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardActions, CardContent, FormControl, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


function LoginPage() {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {

        api.post('/login', { email, password })
            .then(response => {
                const token = response.data.token;
                const _userId = response.data._userId;
                localStorage.setItem('token', token);
                localStorage.setItem('_userId', _userId);

                //window.alert("Successful login! :) ")
                //window.location.reload()
               navigate('/settings')
            })
            .catch(error => {
                setError('Invalid email or password');
            });
    };


    return (
        <div>
            {error && <p>{error}</p>}
            <Card sx={{width:{xs:'90%',md:'400px'},margin:'3rem auto'}}>
                <CardContent>
                    <h2>Login</h2>

                    <FormControl margin='dense' fullWidth>
                        <TextField value={email} type="text" placeholder="e-post" onChange={(e) => setEmail(e.target.value)} name="email"></TextField>

                    </FormControl>
                    <FormControl margin='dense' fullWidth>
                        <TextField value={password} type="password" placeholder="lösenord" onChange={(e) => setPassword(e.target.value)} name="password"></TextField>

                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button size="large" className="loginbutton"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: {
                                    xs:'lightblue',sm:'blue',md:'green',lg:'yellow',xl:'pink'
                                },
                            }} variant="contained" onClick={handleLogin}>Login</Button>


                </CardActions>



            </Card>

                <div className="registerbox">
                <p>or</p>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><Link to="/register">Register</Link> </Typography>
                </div>


        </div>
    );
}

export default LoginPage;
