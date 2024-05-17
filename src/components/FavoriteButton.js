import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const FavoriteButton = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(item => item._id === product._id);
        setIsFavorite(isFav);
    }, [product]);

    const handleToggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFav = favorites.some(item => item._id === product._id);

        if (isFav) {
            favorites = favorites.filter(item => item._id !== product._id);
            setMessage('Removed from favorites');
        } else {
            favorites.push(product);
            setMessage('Added to favorites');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color="secondary"
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite();
                }}
            >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default FavoriteButton;
