import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

import { productQuantity, shortenTitle } from "../helper/helper";
import styles from "./Card.module.css";
import { useCart } from "../contextData/CartContext";

function CardProduct({ data }) {
  const { title, image, price, id } = data;
  const [state, dispatch] = useCart();
  console.log(id)
  const clickHandler = (type) => {
    dispatch({ type, payload: data });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const quantity = productQuantity(state, id);
  console.log(quantity);


  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenTitle(title)}</h3>
      <p>{price}$</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {!!quantity ? (
            <button onClick={() => clickHandler("INCREASE")}>+</button>
          ) : (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          )}
          {!!quantity &&<span>{quantity}</span>}
          {quantity === 1 &&(<button onClick={() => clickHandler("REMOVE_ITEM")}>
            <MdDeleteOutline />
          </button>)}
          {quantity>1 &&( <button onClick={() => clickHandler("DECREASE")}>-</button>)}

         
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
