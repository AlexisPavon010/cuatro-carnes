import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  map: undefined,
  isLoading: boolean,
  isMapVisible: boolean,
  userDirection: string,
  pickUpTime?: string,
  userLocation?: [number, number]
}

const initialState: initialStateProps = {
  map: undefined,
  isLoading: true,
  isMapVisible: false,
  userDirection: '',
  pickUpTime: 'Mañana (8:00am - 13:30pm)',
  userLocation: [-58.587295973638355, -34.442304238763754],
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setUserDirection: (state, { payload }) => {
      state.isLoading = false
      state.userDirection = payload
    },
    setUserLocation: (state, { payload }) => {
      state.isLoading = false
      state.userLocation = payload
    },
    setPickUpTime: (state, { payload }) => {
      state.isLoading = false
      state.pickUpTime = payload
    },
    setLoadMap: (state, { payload }) => {
      state.isLoading = false
      state.map = payload
    },
    setShowMap: (state, { payload }) => {
      state.isLoading = false
      state.isMapVisible = payload
    },
  },
});

export const { setUserLocation, setUserDirection, setPickUpTime, setShowMap } = placesSlice.actions;