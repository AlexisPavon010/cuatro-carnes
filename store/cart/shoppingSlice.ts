import { IProduct } from "@/interfaces/products";
import { createSlice } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const { cart, pickup_or_delivery } = parseCookies()

interface initialStateProps {
  cart: any,
  pickup_or_delivery: 'DELIVERY' | 'PICKUP',
  discount: number
}

const initialState: initialStateProps = {
  cart: cart ? JSON.parse(cart) : [],
  pickup_or_delivery: pickup_or_delivery ? JSON.parse(pickup_or_delivery) : 'DELIVERY',
  discount: 0.00
};

const getCartTotal = (cart: any) => {
  return cart
    ?.reduce((amount: number, item: any) => {
      let optionPrice = 0;
      // if (item.options && item.options.length > 0) {
      //   // Calcular el precio de las opciones sumándolos al precio del elemento
      //   optionPrice = item.options.reduce(
      //     (total: number, option: any) => total + option.price,
      //     0
      //   );
      // }
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
      const { cantidad, ...product } = action.payload;
      // const existingProductIndex = state.cart.findIndex((cartItem: IProduct) => {
      //   // Compara el _id y las opciones seleccionadas del producto
      //   return (
      //     cartItem._id === product._id &&
      //     JSON.stringify(cartItem.options) === JSON.stringify(product.options)
      //   );
      // });

      let newCart = [...state.cart];

      // if (existingProductIndex >= 0) {
      //   // Si el producto ya existe en el carrito con las mismas opciones, suma la cantidad deseada
      //   newCart[existingProductIndex].quantity += quantity;
      // } else {
      //   // Si el producto no existe en el carrito con las mismas opciones, agrégalo con la cantidad deseada
      // }

      product.quantity = cantidad;
      newCart.push(product);

      setCookie(null, 'cart', JSON.stringify(newCart), { path: '/' });
      state.cart = newCart;
    },

    removeFromCart: (state, action) => {
      const itemIndex = action.payload; // El índice del producto que deseas eliminar
      if (itemIndex >= 0 && itemIndex < state.cart.length) {
        let newCart = [...state.cart];
        if (newCart[itemIndex].quantity > 1) {
          newCart[itemIndex].quantity -= 1;
        } else {
          newCart.splice(itemIndex, 1); // Elimina el producto del carrito
        }
        setCookie(null, 'cart', JSON.stringify(newCart), { path: '/', });
        state.cart = newCart;
      } else {
        console.warn("Invalid Index");
      }
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
      setCookie(null, 'pickup_or_delivery', JSON.stringify(action.payload), { path: '/', })
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