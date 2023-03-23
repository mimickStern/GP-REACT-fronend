import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            
        const newItem = action.payload;
        console.log(newItem);
  
        const existItem = state.cart.cartItems.find(
          (item) => item._id === newItem._id
        );
  
        const cartItems = existItem // Check if the new item already exists in the cartItems array
          ? state.cart.cartItems.map(
              (item) => (item._id === existItem._id ? newItem : item) // If it does, replace the existing item with the new one
            )
          : [...state.cart.cartItems, newItem]; // If it doesn't, add the new item to the end of the cartItems array
  
        //localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
        return { ...state, cart: { ...state.cart, cartItems } };

            
        default:
            return state;
    }
}

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
