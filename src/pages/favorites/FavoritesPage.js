import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Box } from '@mui/material';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(item => item._id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    if (favorites.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>Du har inga favoriter ännu.</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Dina favoriter
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                {favorites.map(product => (
                    <Card key={product._id} sx={{ maxWidth: 345 }}>
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
                            
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => handleRemoveFavorite(product._id)}>
                                Ta bort från favoriter
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default FavoritesPage;
