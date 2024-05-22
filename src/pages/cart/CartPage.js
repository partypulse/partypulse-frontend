import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AppContext } from "../../contexts/ApplicationContext";
import { ShoppingCartCheckout } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [appState, setAppstate] = useContext(AppContext);
  const [cart, setCart] = useState(() => {
    // Load initial cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Sync local cart state with localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    setAppstate((prevState) => ({ ...prevState, cart: updatedCart }));
  };

  const handleAddToCart = (id) => {
    let updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item._id === id);

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += 1;
    }

    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    let updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item._id === id);

    if (productIndex !== -1) {
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1;
      } else {
        updatedCart.splice(productIndex, 1);
      }
    }

    updateCart(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    let updatedCart = [...cart];
    updatedCart = updatedCart.filter((item) => item._id !== id);

    updateCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Grid container>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", margin: "20px 0" }}
        >
          Din varukorg
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produkt</TableCell>
              <TableCell>Namn</TableCell>
              <TableCell>Antal</TableCell>
              <TableCell>Pris per styck</TableCell>
              <TableCell>Totalt</TableCell>
              <TableCell>Hantera produkt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDecreaseQuantity(item._id)}>
                    <RemoveIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton onClick={() => handleAddToCart(item._id)}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{item.price} SEK</TableCell>
                <TableCell>{item.price * item.quantity} SEK</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveFromCart(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Total
              </TableCell>
              <TableCell>{calculateTotalPrice()} SEK</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ textAlign: "right", marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/checkout")}
          startIcon={<ShoppingCartCheckout />}
        >
          Till kassan
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartPage;
