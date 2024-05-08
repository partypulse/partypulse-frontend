// src/components/PrivateNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TopbarLoggedIn = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  <Link to="/">Home</Link></Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  <Link to="/settings">Settings</Link></Typography>
                    <Button  size="large"
                             edge="start"
                             color="inherit"
                             aria-label="menu"
                             sx={{ mr: 2 }}onClick={handleLogout} variant='contained'>Logout</Button></Toolbar>
            </AppBar>
        </Box>

    );
};

export default TopbarLoggedIn;