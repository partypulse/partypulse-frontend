import React, { useEffect, useState } from "react";
import {
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

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // get cart-data from browser, stored as a JSON-string
        // if null, empty array is default
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        // update state-var with cart-data
        setCart(cartItems);
    }, []);

    // A function that handles adding a product to the cart
    // or increasing the quantity of a product already in the cart.
    const handleAddToCart = (id) => {
        // Creates a copy of the current cart. This is done to follow the principle of not directly mutating state in React.
        let updatedCart = [...cart];
        // Finds the index of the product with the given ID in the cart.
        const productIndex = updatedCart.findIndex(item => item._id === id);

        // If the product is already in the cart (dvs. productIndex is not -1), increase its quantity by 1.
        if (productIndex !== -1) {
            updatedCart[productIndex].quantity += 1;
        }

        // Updates the cart state variable with the new cart.
        setCart(updatedCart);
        // Updates localStorage with the new cart, converted to a JSON string.
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // manages to reduce the quantity of a product in the shopping cart.
    // If the quantity is 1, the product is removed.
    const handleDecreaseQuantity = (id) => {
        let updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item._id === id);

        if (productIndex !== -1) {
            if (updatedCart[productIndex].quantity > 1) {
                updatedCart[productIndex].quantity -= 1;
            } else {
                updatedCart.splice(productIndex, 1);
            }
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveFromCart = (id) => {
        let updatedCart = [...cart];
        updatedCart = updatedCart.filter(item => item._id !== id);

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // calculates the total cost of all products in the shopping cart
    // by multiplying each product's price by its quantity and summing these values.
    // Uses the reduce method to sum the total price of all products in the cart.
    // Each product's total price is calculated as item.price * item.quantity, and these values are summed to total.
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (

        <TableContainer component={Paper} sx={{ marginTop: 2  }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', margin: '20px 0' }}>
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
                    {cart.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
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
                        <TableCell colSpan={4} align="right">Total</TableCell>
                        <TableCell>{calculateTotalPrice()} SEK</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartPage;
