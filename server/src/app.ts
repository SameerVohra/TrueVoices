import express from "express";
import cors from "cors"
import { Login } from "./controllers/Login";
import { Register } from "./controllers/Register";
import { AddCompany } from "./controllers/AddCompany";
import verifyToken from "./middlewares/Verification";
import { AddReview } from "./controllers/AddReview";
import { RetrieveReview } from "./controllers/RetrieveReview";
import { GetCompanies } from "./controllers/GetCompanies";
import GetCompanyDetails from "./controllers/GetCompanyDetails";
import ApproveReview from "./controllers/ApproveReview";
import RemoveReview from "./controllers/RemoveReview";
const app = express();

app.use(cors({origin:"*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],}))
app.use(express.json())

app.post("/login", Login);
app.post("/register", Register);
app.post("/register-company", verifyToken, AddCompany);
app.post("/add-review", AddReview);
app.post("/get-review", RetrieveReview);
app.post("/get-companies", verifyToken, GetCompanies);
app.post("/get-companydetails", GetCompanyDetails);
app.post("/approve", verifyToken, ApproveReview);
app.delete("/remove", verifyToken, RemoveReview);

export default app;
