import React from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#c16cde",
        color: "#000000",
        padding: "20px 0",
        backgroundImage:
          "linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)",
        boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ textAlign: "center" }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#334eff" }}>
              Viktiga länkar
            </Typography>
            <Link
              href="/terms"
              sx={{
                color: "#337aff",
                textDecoration: "none",
                "&:hover": { color: "#0aa226" },
              }}
            >
              Användarvillkor
            </Link>
            <br />
            <Link
              href="/privacy"
              sx={{
                color: "#ff5733",
                textDecoration: "none",
                "&:hover": {
                  color: "#c70039",
                  transform: "scale(1.65)",
                },
              }}
            >
              Sekretesspolicy
            </Link>
            <br />
            <Link href="/faq" color="inherit" underline="hover">
              FAQ
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#ffc533" }}>
              Kontaktinformation
            </Typography>
            <Typography variant="body2">
              E-post: partypulse@email.com
            </Typography>
            <Typography variant="body2">Telefon: 012-345 67 89</Typography>
            <Typography variant="body2">
              Adress: Exempelgatan 1, 123 45 Exempelstad
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Följ oss
            </Typography>
            <IconButton
              href="https://facebook.com"
              color="inherit"
              sx={{
                background: "linear-gradient(45deg, #337aff, #ffcccb)",
                padding: "2px",
                borderRadius: "8px",
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" sx={{ color: "#00a8ff" }}>
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              color="inherit"
              sx={{
                "@keyframes bounce": {
                  "0%, 20%, 50%, 80%, 100%": {
                    transform: "translateY(0)",
                  },
                  "40%": {
                    transform: "translateY(-20px)",
                  },
                  "60%": {
                    transform: "translateY(-15px)",
                  },
                },
                animation: "bounce 2s infinite",
              }}
            >
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{
            marginTop: "20px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "rotate(10deg) scale(1.1)",
            },
          }}
        >
          © {new Date().getFullYear()} Party Pulse. Alla rättigheter
          förbehållna.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
