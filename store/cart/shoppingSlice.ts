import { createSlice } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const { cart } = parseCookies()

interface initialStateProps {
  cart: any
}

const initialState: initialStateProps = {
  cart: cart ? JSON.parse(cart) : []
};

const getCartTotal = (cart: any) =>
  cart
    ?.reduce((amount: number, item: any) => item.price * item.quantity + amount, 0)
    .toFixed(2);

const getTotalItems = (cart: any) =>
  cart?.reduce((total: number, item: any) => item.quantity + total, 0);

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      let newCart = [...state.cart];
      if (itemIndex >= 0) {
        newCart[itemIndex].quantity += 1;
      } else {
        newCart = [...state.cart, action.payload];
      }
      setCookie(null, 'cart', JSON.stringify(newCart), { path: '/', })
      state.cart = newCart;
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let newCart = [...state.cart];
      if (itemIndex >= 0) {
        if (newCart[itemIndex].quantity > 1) {
          newCart[itemIndex].quantity -= 1;
        } else {
          newCart.splice(itemIndex, 1);
        }
      } else {
        console.warn("Item Not Found");
      }
      setCookie(null, 'cart', JSON.stringify(newCart), { path: '/', })
      state.cart = newCart;
    },

    removeAllItems: (state, action) => {
      const newCart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      setCookie(null, 'cart', JSON.stringify(newCart), { path: '/', })
      state.cart = newCart;
    },

    restoreCart: (state, action) => {
      state.cart = action.payload;
    },

    emptyCart: (state) => {
      destroyCookie(null, 'cart')
      state.cart = [];
    }

  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllItems,
  restoreCart,
  emptyCart,
} = shoppingSlice.actions;

export { getCartTotal, getTotalItems };