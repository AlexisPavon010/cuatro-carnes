import { configureStore } from '@reduxjs/toolkit'
import { shoppingSlice } from './cart/shoppingSlice'
import { placesSlice } from './places/placesSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
  reducer: {
    shopping: shoppingSlice.reducer,
    places: placesSlice.reducer,
    ui: uiSlice.reducer
  },
})