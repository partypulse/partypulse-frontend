import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Facebook, Instagram, Twitter } from "@mui/icons-material";
import "../../css/footer.css";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#c16cde",
        color: "#000000",
        padding: "100px 0",
        backgroundImage:
          "linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)",
        boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "0 0 16px 16px",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#334eff" }}>
              Viktiga länkar
            </Typography>
            <ul className="footer-list">
              <li>
                <Link
                  href="/terms"
                  sx={{
                    color: "#fff",
                    fontFamily: "Nunito, sans-serif",
                    textDecoration: "none",
                    "&:hover": { color: "#ff3366" },
                  }}
                >
                  Användarvillkor
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  sx={{
                    color: "#ff5733",
                    textDecoration: "none",
                    "&:hover": { color: "#ff6100", transform: "scale(1.65)" },
                  }}
                >
                  Sekretesspolicy
                </Link>
              </li>
              <li>
                <Link href="/faq" color="inherit" underline="hover">
                  FAQ
                </Link>
              </li>
            </ul>
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
                  "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
                  "40%": { transform: "translateY(-20px)" },
                  "60%": { transform: "translateY(-15px)" },
                },
                animation: "bounce 2s infinite",
              }}
            >
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              PartyPulse
            </Typography>
            <Typography variant="body2">
              Där varje fest börjar med en puls av glädje!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick links
            </Typography>
            <ul className="footer-list">
              <li>
                <Link
                  href="#features"
                  sx={{
                    color: "#337aff",
                    textDecoration: "none",
                    "&:hover": { color: "#0aa226" },
                  }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#home"
                  sx={{
                    color: "#ff5733",
                    textDecoration: "none",
                    "&:hover": { color: "#c70039", transform: "scale(1.65)" },
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  sx={{
                    color: "#337aff",
                    textDecoration: "none",
                    "&:hover": { color: "#0aa226" },
                  }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#download"
                  sx={{
                    color: "#ff5733",
                    textDecoration: "none",
                    "&:hover": { color: "#c70039", transform: "scale(1.65)" },
                  }}
                >
                  Download
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#34119d",
                fontWeight: "700",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Nyhetsbrev
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Anmäl dig för att få de senaste uppdateringarna och få 10% på ditt
              nästa köp!
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="E-postadress"
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#ff6699",
                  color: "white",
                  "&:hover": { backgroundColor: "#ff3366" },
                }}
              >
                <Add />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{
            marginTop: "20px",
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "rotate(10deg) scale(1.1)" },
          }}
        >
          © {new Date().getFullYear()} Party Pulse. Alla rättigheter
          förbehållna.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
