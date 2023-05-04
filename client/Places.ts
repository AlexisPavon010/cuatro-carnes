import axios from "axios"

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    language: 'es',
    access_token: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  }
})