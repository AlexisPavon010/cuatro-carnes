import { configureStore } from '@reduxjs/toolkit'
import { shoppingSlice } from './cart/shoppingSlice'
import { placesSlice } from './places/placesSlice'

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice.reducer,
    places: placesSlice.reducer
  },
})