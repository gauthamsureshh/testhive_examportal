import React from "react";
import "../Style/header.css";
import { useSelector } from "react-redux";

function Header(){
    const category=useSelector(store=>store.data.test_category);

    return(
        <header>
            <h2>TestHive</h2>
            <h1>EXAM CATEGORY:{category.toUpperCase()}</h1>
        </header>
    );
}

export default Header;