import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, ListItemIcon } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TopbarPublic() {
  // State för att hålla reda på om sidomenyn är öppen eller stängd
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Funktion för att öppna och stänga sidomenyn
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffcccb",
          color: "#000",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "10px 0",
        }}
      >
        <Toolbar>
          {/*<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSideMenu} // Anropa handleMenuIconClick när ikonen klickas
          >
            <MenuIcon />
          </IconButton>*/}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Home</Link>{" "}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/login">Login</Link>{" "}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/register">Register</Link>{" "}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
              gap: "1rem",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {/* Account
            <Link to="/settings">
              <Icon
                path={mdiAccount}
                title="Logga in på mina sidor"
                size={1.5}
                horizontal
                vertical
                rotate={180}
                color="white"
              />
            </Link>*/}

            {/* Heart
            <Link to="/favorites">
              <Icon
                path={mdiHeartOutline}
                title="Favoriter"
                size={1.2}
                color="white"
              />
            </Link>*/}

            {/* Cart */}
            {/*
                <Link to="/cart">
                  <Icon path={mdiCart} size={1.2} title="Varukorg" />
                </Link>
             */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isSideMenuOpen} onClose={toggleSideMenu}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Meny" anchor="left" />
              <ListItemIcon>
                <ClearIcon anchor="right" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* Lägg till dina kategorier som listelement här */}
          <ListItemButton component="a" href="#category1">
            <ListItemIcon>
              <CelebrationIcon></CelebrationIcon>
            </ListItemIcon>
            <ListItemText primary="Kategori 1" />

            <ListItemIcon>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
            <ListItemIcon>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton component="a" href="category2">
            <ListItemText primary="Kategori 2" />
            <ListItemIcon>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </ListItemIcon>
          </ListItemButton>
          {/* Lägg till fler kategorier här */}
        </List>
      </Drawer>
    </Box>
  );
}
