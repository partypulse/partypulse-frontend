import React, { useState, useEffect } from "react";
import api from "../../api/api.js";
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import ProductList from "../productlist/ProductList";

const StartPage = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const latestResponse = await api.get("/products/latest");
                const bestSellersResponse = await api.get("/products/bestsellers");
                const categoriesResponse = await api.get("/categories");
                setLatestProducts(latestResponse.data);
                setBestSellers(bestSellersResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="start-page">
            <Box sx={{ backgroundColor: '#ff96da', padding: '40px 0', textAlign: 'center', backgroundImage: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)', }}>
                <Typography variant="h2" gutterBottom>
                    Välkommen till Party Pulse!
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Ditt bästa val för alla festbehov!
                </Typography>
                <Button variant="contained" color="primary" sx={{ margin: '20px' }}>
                    Shoppa Nu
                </Button>
                <Button variant="outlined" color="secondary" sx={{ margin: '20px' }}>
                    Utforska Kategorier
                </Button>
            </Box>

            <Container>
                <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
                    Produktkategorier
                </Typography>
                <Grid container spacing={4}>
                    {categories.map(category => (
                        <Grid item xs={12} sm={6} md={4} key={category.id}>
                            <Box sx={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                textAlign: 'center',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                                },
                            }}>
                                <Typography variant="h6">{category.name}</Typography>
                                <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                                    Utforska
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
                    Senaste Produkter
                </Typography>
                <Grid container spacing={4}>
                    {latestProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Box sx={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                textAlign: 'center',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                                },
                            }}>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2">{product.price} SEK</Typography>
                                <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                                    Köp nu
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
                    Bästsäljare
                </Typography>
                <Grid container spacing={4}>
                    {bestSellers.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Box sx={{
                                backgroundColor: '#fff',
                                padding: '20px',
                                textAlign: 'center',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                                },
                            }}>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2">{product.price} SEK</Typography>
                                <Button variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                                    Köp nu
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <ProductList />
        </div>
    );
}

export default StartPage;
