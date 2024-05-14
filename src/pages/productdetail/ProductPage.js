import React, { useEffect, useState } from 'react';
// get parameters from URL
import { useParams } from 'react-router-dom';
import api from "../../api/api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

const ProductPage = () => {
    // get id from url
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // useEffect: A hook that allows us to perform side effects in functional components.
    // Here it is used to retrieve product data from the API when the component is loaded or when the id is changed.
    useEffect(() => {
        // getProduct: An asynchronous function that retrieves product data from the API based on the product ID.
        // If the call succeeds, product is updated with the retrieved data. If it fails, the error is logged to the console.
        const getProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        // Immediate executing function to handle the asynchrony correctly
        (async () => {
            await getProduct();
        })();

    }, [id]);


    // handleAddToCart: A function that handles adding the product to the cart.
    // localStorage: A web storage that allows storing key/value pairs in a browser. Here it is used to store the shopping cart.
    // JSON.parse: Loads and parses JSON format from localStorage. If there is nothing stored, an empty array is used.
    // cart.push(product): Adds the current product to the cart.
    // localStorage.setItem: Updates the cart in localStorage with the new product.
    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Loading State: If product is null, which means the product is still loading, "Loading..." will appear on the screen.
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="500"
                image={product.image}
                alt={product.name}
            />
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
            </CardContent>
            <CardActions>
                <Button size="medium" color="primary" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductPage;
