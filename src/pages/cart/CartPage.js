import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
    }, []);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="cart-page">
            <h1>Varukorgen</h1>
            <div className="cart-grid">
                {cart.map(product => (
                    <Card key={product._id} sx={{ maxWidth: 345, margin: 2 }}>
                        <CardMedia
                            component="img"
                            height="50"
                            image={product.image}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Price: {product.price} SEK
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => handleRemoveFromCart(product._id)}>
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CartPage;
