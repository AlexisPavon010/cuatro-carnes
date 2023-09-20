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
      const newItem = action.payload;
      const existingProduct = state.cart.find(
        (cartItem: IProduct) =>
          cartItem._id === newItem._id &&
          JSON.stringify(cartItem.options) === JSON.stringify(newItem.options)
      );

      if (existingProduct) {
        // Si el producto con las mismas opciones ya existe, clona el carrito
        const newCart = [...state.cart];
        // Encuentra el producto existente en el nuevo carrito
        const existingProductIndex = newCart.findIndex(
          (cartItem) =>
            cartItem._id === newItem._id &&
            JSON.stringify(cartItem.options) === JSON.stringify(newItem.options)
        );
        // Incrementa la cantidad del producto existente
        newCart[existingProductIndex].quantity += 1;
        // Actualiza la cookie y el estado con el nuevo carrito
        setCookie(null, 'cart', JSON.stringify(newCart), { path: '/' });
        state.cart = newCart;
      } else {
        // Si el producto no existe en el carrito, agrégalo como un nuevo producto
        const newCart = [...state.cart, { ...newItem, quantity: 1 }];
        // Actualiza la cookie y el estado con el nuevo carrito
        setCookie(null, 'cart', JSON.stringify(newCart), { path: '/' });
        state.cart = newCart;
      }
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