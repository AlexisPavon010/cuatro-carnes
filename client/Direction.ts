import axios from "axios"

export const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    geometries: 'geojson',
    overview: 'simplified',
    alternatives: 'false',
    steps: false,
    access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  }
})