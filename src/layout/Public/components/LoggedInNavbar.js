import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useScrollYPosition } from "react-use-scroll-position";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Divider } from "@mui/material";
import "../css/navbar.css";
import Box from "@mui/material/Box";

function LoggedInNavbar({ links }) {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const scrollY = useScrollYPosition();

  const stickeyTrigger = window.innerHeight / 2.75;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
            {links &&
              links.map((link, i) => (
                <a className="nav-link" href={link.href} key={i}>
                  <div className="nav-link__text">{link.title}</div>
                  <div className="nav-link__background" />
                </a>
              ))}
          </nav>

          <div
            className="nav-menu__icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div />
            <div />
          </div>

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
                  <Typography textAlign="center">Mina beställningar</Typography>
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
        </div>
      </div>
    </Container>
  );
}

LoggedInNavbar.defaultProps = {
  links: [
    { title: "Home", href: "#home" },
    { title: "Features", href: "#features" },
    { title: "Services", href: "#services" },
    { title: "Pricing", href: "#pricing" },
    { title: "Contact", href: "#contact" },
  ],
};

export default LoggedInNavbar;
