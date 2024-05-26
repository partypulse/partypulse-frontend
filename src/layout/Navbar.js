import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useScrollYPosition } from "react-use-scroll-position";
import "../css/navbar.css";
import { useAuth } from "../hooks/useAuth";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

function Navbar({ links }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollYPosition();
  const isAuthenticated = localStorage.getItem("tid") !== "null";

  const { logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const stickeyTrigger = window.innerHeight / 2.75;

  const loggedOutLinks = [
    { title: "Home", href: "#home" },
    { title: "Nyheter", href: "#news" },
    { title: "Kampanj", href: "#campaign" },
    { title: "Inspiration", href: "#inspiration" },
    { title: "Contact", href: "#contact" },
  ];
  const loggedInLinks = [
    { title: "Produkter", href: "/products" },
    { title: "Favoriter", href: "/favourites" },
  ];
  console.log(isAuthenticated);
  return (
    <Container>
      <div
        className={`nav${scrollY > stickeyTrigger ? " nav-stickey" : ""}${
          menuOpen ? " nav-open" : ""
        }`}
      >
        <div className="nav-content">
          <div className="nav-logo">PartyPulse</div>

          <nav className="nav-links__container">
            {isAuthenticated ? (
              <React.Fragment>
                {loggedInLinks &&
                  loggedInLinks.map((link, i) => (
                    <a className="nav-link" href={link.href} key={i}>
                      <div className="nav-link__text">{link.title}</div>
                      <div className="nav-link__background" />
                    </a>
                  ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {loggedOutLinks &&
                  loggedOutLinks.map((link, i) => (
                    <a className="nav-link" href={link.href} key={i}>
                      <div className="nav-link__text">{link.title}</div>
                      <div className="nav-link__background" />
                    </a>
                  ))}
              </React.Fragment>
            )}
            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link to={"/settings"}>
                    <MenuItem>
                      <Typography textAlign="center">Inställningar</Typography>
                    </MenuItem>
                  </Link>
                  <Link to={"/myorders"}>
                    <MenuItem>
                      <Typography textAlign="center">
                        Mina beställningar
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={"/favourites"}>
                    <MenuItem>
                      <Typography textAlign="center">Favoriter</Typography>
                    </MenuItem>
                  </Link>
                  <Link to={"/cart"}>
                    <MenuItem>
                      <Typography textAlign="center">Cart</Typography>
                    </MenuItem>
                  </Link>
                  <Divider />
                  {localStorage.getItem("role") === "admin" && (
                    <Link to={"/admin"}>
                      <MenuItem>
                        <Typography textAlign="center">Admin</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={logout}>
                    <Typography textAlign="center">Logga ut</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <React.Fragment>
                <a className="nav-link" href={"/login"}>
                  <div className="nav-link__text">Logga in</div>
                  <div className="nav-link__background" />
                </a>
                <a className="nav-link" href={"/register"}>
                  <div className="nav-link__text">Skapa konto</div>
                  <div className="nav-link__background" />
                </a>
              </React.Fragment>
            )}
          </nav>

          <div
            className="nav-menu__icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div />
            <div />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Navbar;
