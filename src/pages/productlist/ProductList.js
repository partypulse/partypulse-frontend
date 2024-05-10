import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div className="start-page">
            <h1>Startsida</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.info}</p>
                            <p>Price: {product.price} SEK</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
