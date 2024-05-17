import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import FavoriteButton from '../../components/FavoriteButton';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (product, increment = 1) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item._id === product._id);

        if (productInCart) {
            productInCart.quantity += increment;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <Box className="start-page" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {products.map(product => (
                <Card key={product._id} sx={{ maxWidth: 345, margin: 2, position: 'relative' }}>
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
                        <Button size="medium" color="primary" onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default ProductList;
