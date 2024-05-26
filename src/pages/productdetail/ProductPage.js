import React, { useEffect, useState } from "react";
// get parameters from URL
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Button,
  CardActions,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Rating from "react-rating-stars-component";
import { Add } from "@mui/icons-material";
import FavoriteButton from "../../components/FavoriteButton";

export const style = {
  button: {
    padding: "2rem",
    color: "red",
  },
  div: {
    padding: "5rem",
  },
  h4: {
    fontSize: "5rem",
  },
};

const ProductPage = () => {
  // get id from url
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);

  // useEffect: A hook that allows us to perform side effects in functional components.
  // Here it is used to retrieve product data from the API when the component is loaded or when the id is changed.
  useEffect(() => {
    // getProduct: An asynchronous function that retrieves product data from the API based on the product ID.
    // If the call succeeds, product is updated with the retrieved data. If it fails, the error is logged to the console.
    const getProduct = async () => {
      try {
        // calling api to get data based on id
        const response = await api.get(`/product/getone/${id}`);
        // Updates the product state variable with data retrieved from the API.
        setProduct(response.data);
        // Calls the checkIfFavorite function to check if the fetched product is a favorite and updates the isFavorite state.
        checkIfFavorite(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Kunde inte hämta produktdata. Vänligen försök igen senare.");
      }
    };

    const checkIfFavorite = (product) => {
      // Gets the favorites list from localStorage and converts it from a JSON string to a JavaScript object. If no favorites list exists, an empty array is used.
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // checks if prod is in the list.
      const isFav = favorites.some((item) => item._id === product._id);
      // updates state dep if it's a fav or not.
      setIsFavorite(isFav);
    };

    // Immediately Invoked Function Expression
    // Immediate executing function to handle the asynchronous correctly = when component is loading or id is changing
    (async () => {
      await getProduct();
    })();
  }, [id]);

  // handleAddToCart: A function that handles adding the product to the cart.
  // localStorage: A web storage that allows storing key/value pairs in a browser. Here it is used to store the shopping cart.
  // JSON.parse: Loads and parses JSON format from localStorage. If there is nothing stored, an empty array is used.
  // cart.push(product): Adds the current product to the cart.
  // localStorage.setItem: Updates the cart in localStorage with the new product.
  const handleAddToCart = (increment = 1) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item._id === product._id);

    if (productInCart) {
      productInCart.quantity += increment;
    } else {
      cart.push({ ...product, quantity: increment });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleReviewSubmit = () => {
    setLoading(true);
    // ***** TO DO!!!!! lägga till logik för att skicka recensionen till en server eller spara den lokalt
    console.log(`Review submitted: ${review}, Rating: ${rating}`);
  };

  // Loading State: If product is null, which means the product is still loading, "Loading..." will appear on the screen.
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "20px auto",
        maxWidth: 1200,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ width: "100%", marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <Card sx={{ flex: 1, marginRight: 2, position: "relative" }}>
        <CardMedia
          component="img"
          height="500"
          image={product.image}
          alt={product.name}
        />
        <FavoriteButton
          // sending props
          product={product}
          // boolean, indicates if prod is a fav => correct icon
          isFavorite={isFavorite}
          // callback func when user presses heart-icon.
          onToggleFavorite={() => setIsFavorite(!isFavorite)}
        />
      </Card>
      <Card sx={{ flex: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.info}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {product.price} SEK
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
            <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          <CardActions>
            <Button
              size="medium"
              color="primary"
              onClick={handleAddToCart(quantity)}
              sx={{
                backgroundColor: "#7bc451",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#22700d",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Lägg i varukorg
            </Button>
          </CardActions>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" component="div">
              Lämna omdöme
            </Typography>
            <Rating
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
            <TextField
              label="Skriv en recension"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 2,
                background: loading ? "red" : "green",
                color: loading ? "blue" : "yellow",
                padding: loading ? "4rem" : "1rem",
              }}
              onClick={handleReviewSubmit}
              startIcon={loading ? <CircularProgress /> : <Add />}
            >
              Skicka en recension
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductPage;
