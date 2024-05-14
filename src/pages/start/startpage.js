import React, {useState, useEffect} from "react";
import api from "../../api/api.js";
import "../../css/productlist.css";
import "../../components/SideMenu";
import ProductList from "../productlist/ProductList";

function StartPage() {
    return (
        <div className="start-page">
            <h1>Startsida</h1>
            <ProductList />
        </div>
    );
}

export default StartPage;
