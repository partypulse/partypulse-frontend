import React, { useEffect, useState } from 'react';
// get parameters from URL
import { useParams } from 'react-router-dom';
import api from "../../api/api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActions, IconButton, Box, TextField, Grid, CircularProgress} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from 'react-rating-stars-component';
import {Add} from "@mui/icons-material";

export const style={
    button:{
        padding:'2rem',color:'red'
    },
    div:{
        padding:'5rem'
    },
    h4:{
        fontSize:'5rem'
    }
}
const ProductPage = () => {
    // get id from url
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
const[loading,setLoading]=useState(false);
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
    const handleAddToCart = (increment = 1) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item._id === product._id);

        if (productInCart) {
            productInCart.quantity += increment;
        } else {
            cart.push({ ...product, quantity: increment });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.some(item => item._id === product._id)) {
            favorites.push(product);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const handleReviewSubmit = () => {
        setLoading(true)
        // ***** TO DO!!!!! lägga till logik för att skicka recensionen till en server eller spara den lokalt
        console.log(`Review submitted: ${review}, Rating: ${rating}`);
    };

    // Loading State: If product is null, which means the product is still loading, "Loading..." will appear on the screen.
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'row', margin: '20px auto', maxWidth: 1200}}>
        <Card sx={{ flex: 1, marginRight: 2, position:'relative' }}>
            <CardMedia
                component="img"
                height="500"
                image={product.image}
                alt={product.name}
            />
            <IconButton
                sx={{position: 'absolute', top: 16, right: 16}}
                color="secondary"
                onClick={handleFavorite}
            >
                <FavoriteIcon/>
            </IconButton>
        </Card>
        <Card sx={{flex: 2}}>
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

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 2}}>
                    <IconButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                        <RemoveIcon/>
                    </IconButton>
                    <Typography variant="body1">{quantity}</Typography>
                    <IconButton onClick={() => setQuantity(quantity + 1)}>
                        <AddIcon/>
                    </IconButton>
                </Box>

                <CardActions>
                    <Button
                        size="medium"
                        color="primary"
                        onClick={handleAddToCart(quantity)}>
                        Lägg i varukorg
                    </Button>
                </CardActions>
                <Box sx={{marginTop: 4}}>
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
                        sx={{marginTop: 2}}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{marginTop: 2,background:loading?'red':'green',color:loading?'blue':'yellow',padding:loading?'4rem':'1rem'}}
                        onClick={handleReviewSubmit}
                        startIcon={loading?<CircularProgress/>:<Add/>}
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
