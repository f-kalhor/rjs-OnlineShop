import React from "react";
import { Link } from "react-router-dom";

import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";

import {shortenTitle} from "../helper/helper";
import styles from "./Card.module.css";
import { useCart } from "../contextData/CartContext";


function CardProduct({ data }) {
  const { title, image, price, id } = data;
  const [state,dispatch]=useCart()

  const addHandler=()=>{
    dispatch({type:"INCREASE",payload:data})
    console.log(state);
    
  }

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenTitle(title)}</h3>
      <p>{price}$</p>
      <div className={styles.actions}>
        <Link to={`/products/:${id}`}>
          <TbListDetails />
        </Link>
        <div>
          <button onClick={addHandler}>
            <TbShoppingBagCheck />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
