import dotenv from "dotenv"
import mongoose from "mongoose";
import app from "./app";

dotenv.config()
const port: number= parseInt(process.env.PORT || "3000");
const DB_URL: string | undefined = process.env.DB_URL;

mongoose.connect(DB_URL!)
  .then(()=>console.log("Connected to DB"))
  .catch((error)=>console.log(`Error Connection to DB: ${error}`))


app.listen(port, ()=>{
  console.log(`Listening to ${port}`)
})
