import React, { createContext, useContext, useEffect, useReducer } from "react";
import { sumProducts } from "../helper/helper";

const CartContext = createContext();

const getInitialSelectedItem = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};
const selectedItem = getInitialSelectedItem();
const { itemsCount, total } = sumProducts(selectedItem);
const initialState = {
  selectedItem,
  itemsCount,
  total,
  checkout: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItem.find((item) => item.id === action.payload.id)) {
        const updatedItems = [
          ...state.selectedItem,
          { ...action.payload, quantity: 1 },
        ];
        return {
          selectedItem: updatedItems,
          ...sumProducts(updatedItems),
          checkout: false,
        };
      }

    case "REMOVE_ITEM":
      const newSelectedItem = state.selectedItem.filter(
        (item) => item.id !== action.payload.id
      );

      return {
        ...state,
        selectedItem: [...newSelectedItem],
        ...sumProducts(newSelectedItem),
      };

    case "INCREASE":
      const increaseIndex = state.selectedItem.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItem[increaseIndex].quantity++;

      return {
        ...state,
        ...sumProducts(state.selectedItem),
      };

    case "DECREASE":
      const decreasedItems = state.selectedItem.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      console.log("decrese", decreasedItems);

      return {
        selectedItem: decreasedItems,
        ...sumProducts(decreasedItems),
        checkout: false,
      };
    case "CHECKOUT":
      return {
        selectedItem: [],
        itemsCount: 0,
        total: 0,
        checkout: true,
      };
    default:
      throw new Error("Invalid Action");
  }
};
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.selectedItem));
    console.log(state.selectedItem);
  }, [state.selectedItem]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export { CartProvider, useCart };
