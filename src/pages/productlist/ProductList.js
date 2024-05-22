import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import FavoriteButton from "../../components/FavoriteButton";
import { AppContext } from "../../contexts/ApplicationContext";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { ShoppingCartCheckout } from "@mui/icons-material";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appState, setAppState] = useContext(AppContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false); // State for cart visibility

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/product/getall");
        setProducts(response.data || []);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product, increment = 1) => {
    let updatedCart;

    if (appState.cart.some((item) => item._id === product._id)) {
      updatedCart = appState.cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + increment };
        }
        return item;
      });
    } else {
      updatedCart = [...appState.cart, { ...product, quantity: increment }];
    }

    // Update both appState and localStorage
    setAppState({
      ...appState,
      cart: updatedCart,
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Show snackbar
    setSelectedProduct(product);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleQuantityChange = (productId, newQuantity) => {
    // Ensure quantity is not negative
    if (newQuantity < 0) {
      return;
    }

    let updatedCart;
    if (newQuantity === 0) {
      // Remove item from cart if quantity is zero
      updatedCart = appState.cart.filter((item) => item._id !== productId);
    } else {
      // Update quantity of the item
      updatedCart = appState.cart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    }

    // Calculate the total price of the updated cart
    const totalPrice = updatedCart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    // Update both appState and localStorage with the updated cart and total price
    setAppState({
      ...appState,
      cart: updatedCart,
      totalPrice: totalPrice, // Assuming totalPrice is a state variable to hold the total price
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("totalPrice", totalPrice); // Store total price in localStorage
  };
  const getProductQuantityInCart = (productId) => {
    const cartItem = appState.cart.find((item) => item._id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const calculateTotalPrice = () => {
    return appState.cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  return (
    <div className="start-page">
      <div className="product-grid">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} md={4} xl={3} key={product._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => handleViewDetails(product._id)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <FavoriteButton product={product} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {product.price} SEK
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stock: {product.stock}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {appState.cart.some((item) => item._id === product._id) ? (
                    <ToggleButtonGroup
                      value={getProductQuantityInCart(product._id)}
                      exclusive
                      onChange={(event, value) =>
                        handleAddToCart(product, value)
                      }
                    >
                      <ToggleButton value={1}>+</ToggleButton>
                      <ToggleButton value={-1}>-</ToggleButton>
                    </ToggleButtonGroup>
                  ) : (
                    <Button
                      size="medium"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={`Added ${selectedProduct && selectedProduct.name} to cart`}
      />
      {appState.cart.length > 0 && (
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, background: "pink" }}
        >
          <Toolbar>
            <Button
              onClick={() => setCartOpen(!cartOpen)}
              sx={{ color: "white" }}
            >
              {cartOpen ? "Close Cart" : "Open Cart"}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/checkout")}
              startIcon={<ShoppingCartCheckout />}
            >
              Till kassan
            </Button>
          </Toolbar>
        </AppBar>
      )}
      {cartOpen && (
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 56, zIndex: 1000, background: "pink" }}
        >
          <Toolbar>
            <TableContainer component={Paper} sx={{ padding: 0, margin: 0 }}>
              <Table sx={{ padding: 0, margin: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ padding: 0, margin: 0 }}>
                      Product
                    </TableCell>
                    <TableCell sx={{ padding: 0, margin: 0 }}>Name</TableCell>
                    <TableCell sx={{ padding: 0, margin: 0 }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ padding: 0, margin: 0 }}>
                      Price per Piece
                    </TableCell>
                    <TableCell sx={{ padding: 0, margin: 0 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appState.cart.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell sx={{ padding: 0, margin: 0 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: 0,
                            padding: 0,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ padding: 0, margin: 0 }}>
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ padding: 0, margin: 0 }}>
                        <ToggleButtonGroup
                          value={item.quantity}
                          exclusive
                          onChange={(event, value) =>
                            handleQuantityChange(item._id, value)
                          }
                        >
                          <ToggleButton value={item.quantity - 1}>
                            -
                          </ToggleButton>
                          <ToggleButton value={item.quantity}>
                            {item.quantity}
                          </ToggleButton>
                          <ToggleButton value={item.quantity + 1}>
                            +
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </TableCell>
                      <TableCell sx={{ padding: 0, margin: 0 }}>
                        {item.price} SEK
                      </TableCell>
                      <TableCell sx={{ padding: 0, margin: 0 }}>
                        {item.price * item.quantity} SEK
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      align="right"
                      sx={{ padding: 0, margin: 0 }}
                    >
                      Total
                    </TableCell>
                    <TableCell sx={{ padding: 0, margin: 0 }}>
                      {calculateTotalPrice()} SEK
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default ProductList;
