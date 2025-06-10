import { FaListUl } from "react-icons/fa";
import { createQueryObject } from "../helper/helper";
import styles from "./SideBar.module.css";

const categories = [
  { id: 1, type: "All" },
  { id: 2, type: "Electronics" },
  { id: 3, type: "Jewelery" },
  { id: 4, type: "Men's Clothing" },
  { id: 5, type: "Women's Clothing" },
];

function SideBar({ setQuery, query }) {
  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = e.target.innerText.toLocaleLowerCase();

    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>category</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((category) => (
          <li
            key={category.id}
            className={category.type.toLocaleLowerCase() === query.category ? styles.selected : null}
          >
            {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
