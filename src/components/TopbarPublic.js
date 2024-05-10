import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import Icon from "@mdi/react";
import {mdiAccount, mdiCart, mdiHeartOutline} from "@mdi/js";

export default function TopbarPublic() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> <Link to="/">Home</Link> </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><Link to="/login">Login</Link> </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><Link to="/register">Register</Link> </Typography>



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
}
