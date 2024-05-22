import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../api/api";

const CheckoutPage = () => {
  const [open, setOpen] = useState(false);
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Credit Card"); // Default payment method
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreditCardChange = (event) => {
    const { name, value } = event.target;
    setCreditCardInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    try {
      const orderData = {
        cart,
        totalPrice: calculateTotalPrice(),
        paymentMethod,
        creditCardInfo: paymentMethod === "Credit Card" ? creditCardInfo : null,
      };

      await api.post("/order/createneworder", orderData);
      navigate("/myorders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Orderöversikt
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produkt</TableCell>
                <TableCell>Namn</TableCell>
                <TableCell>Antal</TableCell>
                <TableCell>Pris per styck</TableCell>
                <TableCell>Totalt</TableCell>
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
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price} SEK</TableCell>
                  <TableCell>{item.price * item.quantity} SEK</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  Total
                </TableCell>
                <TableCell>{calculateTotalPrice()} SEK</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Betala
        </Button>
      </Grid>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Betalningsinformation</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="payment-method-label">Betalningsmetod</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <MenuItem value="Credit Card">Kreditkort</MenuItem>
              <MenuItem value="Klarna">Klarna</MenuItem>
              <MenuItem value="Swish">Swish</MenuItem>
              <MenuItem value="Cash on Delivery">Kontant vid leverans</MenuItem>
            </Select>
          </FormControl>
          {paymentMethod === "Credit Card" && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="cardNumber"
                label="Kortnummer"
                type="text"
                fullWidth
                value={creditCardInfo.cardNumber}
                onChange={handleCreditCardChange}
              />
              <TextField
                margin="dense"
                name="expiryDate"
                label="Utgångsdatum (MM/YY)"
                type="text"
                fullWidth
                value={creditCardInfo.expiryDate}
                onChange={handleCreditCardChange}
              />
              <TextField
                margin="dense"
                name="cvv"
                label="CVV"
                type="text"
                fullWidth
                value={creditCardInfo.cvv}
                onChange={handleCreditCardChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Avbryt</Button>
          <Button onClick={handlePayment} color="primary">
            Betala
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CheckoutPage;
