import React, { useEffect, useState } from "react";
import { useProducts } from "../contextData/ProductsContext";
import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";

import styles from "./ProductsPage.module.css";
import CardProduct from "../components/CardProduct";
import Loader from "../components/Loader";

function Products() {
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [displayed,setDisplayed]=useState([])

  useEffect(()=>{
    setDisplayed(products)
  },[products])


  const searchHandler = () => {
    console.log(search);
  };
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = e.target.innerText.toLocaleLowerCase();

    if (tagName !== "LI") return;
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <div>
          <div>
            <FaListUl />
            <p>category</p>
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Woman's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Products;
