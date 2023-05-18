import { IProduct } from "@/interfaces/products";
import { createSlice } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const { cart } = parseCookies()

interface initialStateProps {
  cart: any,
  pickup_or_delivery: 'DELIVERY' | 'PICKUP',
  discount: number
}

const initialState: initialStateProps = {
  cart: cart ? JSON.parse(cart) : [],
  pickup_or_delivery: 'DELIVERY',
  discount: 0.00
};

const getCartTotal = (cart: any) => {
  return cart
    ?.reduce((amount: number, item: any) => {
      let optionPrice = 0;
      if (item.options && item.options.length > 0) {
        // Calcular el precio de las opciones sumándolos al precio del elemento
        optionPrice = item.options.reduce(
          (total: number, option: any) => total + option.price,
          0
        );
      }
      return item.price * item.quantity + optionPrice + amount;
    }, 0)
    .toFixed(2);
};

const getTotalItems = (cart: any) =>
  cart?.reduce((total: number, item: any) => item.quantity + total, 0);

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (cartItem: IProduct) => cartItem._id === action.payload._id
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
        (cartItem: IProduct) => cartItem._id === action.payload
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
        (cartItem: IProduct) => cartItem._id !== action.payload
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
    },

    setShippingMethod: (state, action) => {
      state.pickup_or_delivery = action.payload;
    },

    setDiscountPercentage: (state, action) => {
      state.discount = action.payload;
    }

  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllItems,
  restoreCart,
  emptyCart,
  setShippingMethod,
  setDiscountPercentage
} = shoppingSlice.actions;

export { getCartTotal, getTotalItems };