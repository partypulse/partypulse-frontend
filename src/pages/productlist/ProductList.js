import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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

    return (
        <div className="start-page">
            <div className="product-grid">
                {products.map(product => (
                    <Card key={product._id} sx={{ maxWidth: 345, margin: 2 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
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
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => handleViewDetails(product._id)}>
                                View Details
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
