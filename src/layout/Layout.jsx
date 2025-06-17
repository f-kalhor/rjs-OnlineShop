import React from "react";
import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

import { useCart } from "../contextData/CartContext";
import styles from "./Layout.module.css"

function Layout({children}) {
  const [state] = useCart();
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">BotoShop</Link>
        <div>
          <Link to="/checkout">
            <PiShoppingCartSimpleBold />
            {!!state.itemsCount && <span>{state.itemsCount}</span>}
          </Link>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>Developed By smile <span>:)</span> </footer>
    </>
  );
}

export default Layout;
