import express from "express";
import cors from "cors"
import { Login } from "./controllers/Login";
import { Register } from "./controllers/Register";
import { AddCompany } from "./controllers/AddCompany";
import verifyToken from "./middlewares/Verification";
import { AddReview } from "./controllers/AddReview";
const app = express();

app.use(cors({origin:"*"}))
app.use(express.json())

app.post("/login", Login);
app.post("/register", Register);
app.post("/register-company", verifyToken, AddCompany);
app.post("/add-review", AddReview);
export default app;
