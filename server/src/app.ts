import express from "express";
import cors from "cors"
import { Login } from "./controllers/Login";
import { Register } from "./controllers/Register";
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json())

app.post("/login", Login);
app.post("/register", Register);

export default app;
