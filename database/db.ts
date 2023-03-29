import mongoose from "mongoose";

(() => (
  mongoose.connect(process.env.DATABASE_URL!)
    .then(() => {
      console.log('Data base is connected 🚀')
    })
    .catch((error) => {
      console.log(error)
    })
)) ()