import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (product) => {
    let updatedFavorites = [...favorites];
    updatedFavorites = updatedFavorites.filter(
      (item) => item._id !== product._id,
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setMessage("Removed from favorites");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (favorites.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
        You have no favorites yet.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Your Favorites
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {favorites.map((product) => (
          <Card key={product._id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => handleRemoveFavorite(product)}
              >
                Remove from Favorites
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default FavoritesPage;
