import React, { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helper/helper";

const CartContext = createContext();
const initialState = {
  selectedItem: [],
  itemsCount: 0,
  total: 0,
  checkout: false,
};

const reducer = (state, action) => {
  
  switch (action.type) {
    case "ADD_ITEM":
  if (!state.selectedItem.find((item) => item.id === action.payload.id)) {
    const updatedItems = [...state.selectedItem, { ...action.payload, quantity: 1 }];
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
        console.log("decrese",decreasedItems);
        
        return {
          selectedItem: decreasedItems,
          ...sumProducts(decreasedItems),
          checkout:false
        };
      case "CHECKOUT":
        return{
            selectedItem:[],
            itemsCount:0,
            total:0,
            checkout:true
        }
    default:
      throw new Error("Invalid Action");
  }
};
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
