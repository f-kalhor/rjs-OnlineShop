import React, { useEffect, useState } from "react";
import { useProducts } from "../contextData/ProductsContext";

import styles from "./ProductsPage.module.css";
import CardProduct from "../components/CardProduct";
import Loader from "../components/Loader";
import {
  createQueryObject,
  filteredProducts,
  getInitialQuery,
  searchProducts,
} from "../helper/helper";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import SideBar from "../components/SideBar";

function Products() {
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(products);

  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filteredProducts(finalProducts, query.category);
    setSearch(query.search || "")
    setSearchParams(query);
    setDisplayed(finalProducts);
  }, [query]);

  
  
  return (
    <>
     <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((product) => (
            <CardProduct key={product.id} data={product} />
          ))}
        </div>
        <SideBar setQuery={setQuery}/>
      </div>
    </>
  );
}

export default Products;
