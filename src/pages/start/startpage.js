import React, {useState, useEffect} from "react";
import api from "../../api/api.js";
import "../../css/productlist.css";
import "../../components/SideMenu";

function StartPage(){

    // Definiera lokal state för kategorier och sidomenyöppning
    const [categories, setCategories] = useState([]); // Antag att categories är en array med kategorier
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    // Funktion för att öppna sidomenyn
    const openSideMenu = () => {
        setIsSideMenuOpen(true);
    };

    // Funktion för att stänga sidomenyn
    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };


    const [products, setProducts] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = () =>  {
        api.get("/products")
            .then( response=> setProducts(response.data))
            .catch( error=> console.error(error));
    }

    return(


    <div className="start-page">
        <h1>Startsida</h1>
        <div className="product-grid">
            {products.map(product => (
                <div key={product._id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.info}</p>
                    <p>Price: {product.price} SEK</p>
                    <p>Stock: {product.stock}</p>
                </div>
            ))}
        </div>
    </div>

    )

}

export default StartPage;