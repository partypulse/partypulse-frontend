import React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = ({ product, isFavorite, onToggleFavorite }) => {
    const handleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            favorites = favorites.filter(item => item._id !== product._id);
        } else {
            favorites.push(product);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        onToggleFavorite && onToggleFavorite();
    };

    return (
        <IconButton
            sx={{ position: 'absolute', top: 16, right: 16 }}
            color="secondary"
            onClick={handleFavorite}
        >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

export default FavoriteButton;
