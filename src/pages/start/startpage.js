import React, {useState, useEffect} from "react";
import api from "../../api/api.js";

function StartPage(){

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getData()
    }, []);

    const getData = () =>  {
        api.get("/products").then( response=> setProducts(response.data)).catch( error=> console.error(error))
    }

    return( <div> <h1>Startsida</h1>
    <div> {JSON.stringify(products)}</div></div> )

}

export default StartPage;