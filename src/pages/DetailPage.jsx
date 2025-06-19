import React from "react";
import { Link, useParams } from "react-router-dom";
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

import Loader from "../components/Loader";
import { useProductsDetailes } from "../contextData/ProductsContext";
import styles from "./DetailPage.module.css";

function DetailPage() {
  const { id } = useParams();

  const productDetailes = useProductsDetailes(+id);
  console.log(productDetailes);
  if (!productDetailes) return <Loader />;

  const { image, title, price, description, category } = productDetailes;
  return (
    <div className={styles.container}>
      <img src={image} alt={title} />
      <div className={styles.information}>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {category}
        </p>

        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {price} $
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
