import { IProduct } from "@/interfaces/products";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  is_open_modal: { visible: boolean, product: undefined | IProduct }
  is_open_cart_drawer: boolean
}

const INITIAL_STATE: initialStateProps = {
  is_open_modal: { visible: false, product: undefined },
  is_open_cart_drawer: false,
}

export const uiSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'ui',
  reducers: {
    setOpenOrderModal: (state, actions) => {
      state.is_open_modal = actions.payload
    },
    setOpenCartDrawer: (state, actions) => {
      state.is_open_cart_drawer = actions.payload
    }
  }
})


export const { setOpenOrderModal, setOpenCartDrawer } = uiSlice.actions;