import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PublicNavbar from "./Public/components/Navbar";
import LoggedInNavbar from "./Public/components/LoggedInNavbar";

function Navbar() {
  const { user } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">LOGO</Link>
        </Box>
        {user ? <LoggedInNavbar /> : <PublicNavbar />}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
