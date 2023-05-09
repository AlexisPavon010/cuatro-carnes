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
  userDirection: 'Av. Juan B. Justo 2085, B1648 Tigre, Provincia de Buenos Aires',
  pickUpTime: 'Mañana (7:00am - 12:00pm)',
  userLocation: [-58.58349311794545, -34.445403398664254],
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