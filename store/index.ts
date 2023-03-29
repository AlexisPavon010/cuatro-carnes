import { configureStore } from '@reduxjs/toolkit'
import { shoppingSlice } from './cart/shoppingSlice'

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice.reducer,
  },
})