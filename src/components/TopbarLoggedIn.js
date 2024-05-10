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
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiHeartOutline } from '@mdi/js';
import { mdiCart } from '@mdi/js';
import { mdiPartyPopper } from '@mdi/js';
import { mdiRocketLaunchOutline } from '@mdi/js';



const TopbarLoggedIn = () => {

    const navigate = useNavigate();

    // takes user to homepage when logging out
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (


        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{display:'flex', flexDirection:'row', justifyContent:'space-between',}}>
                    <Box ><IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton></Box>

                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'left', gap:'1rem', alignItems:'center', alignContent:'center',}}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  <Link to="/">Home</Link></Typography>

                        <Icon path={mdiPartyPopper}
                              size={1.5}
                              title="Nyheter"
                        /><h3>Nyheter</h3>

                        <Icon path={mdiRocketLaunchOutline}
                              size={1}
                              title="Topplistan"
                        /><h3>Topplistan</h3>
                    </Box>


                    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'right', gap:'1rem', alignItems:'center', alignContent:'center',}}>
                        <Link to="/settings">
                            <Icon path={mdiAccount}
                                  title="Logga in på mina sidor"
                                  size={1.5}
                                  horizontal
                                  vertical
                                  rotate={180}
                                  color="white" />
                        </Link>

                        <Icon path={mdiHeartOutline}
                              title="Favoriter"
                              size={1.2}
                        />
                        <Icon path={mdiCart}
                              size={1.2}
                              title="Varukorg"/>
                    </Box>





                </Toolbar>
            </AppBar>


        </Box>

    );
};

export default TopbarLoggedIn;