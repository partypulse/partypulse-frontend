import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
    }, []);

    const handleRemoveFromCart = (id) => {
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

    // sums the price of all products in the cart based on their quantity.
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Artikel</TableCell>
                        <TableCell>Namn</TableCell>
                        <TableCell>Antal</TableCell>
                        <TableCell>Pris per styck</TableCell>
                        <TableCell>Totalt</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map(item => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
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
