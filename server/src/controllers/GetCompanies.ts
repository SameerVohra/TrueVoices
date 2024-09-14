import companyModel from "../models/Company";
import {Request, Response} from "express";

export const GetCompanies = async(req:Request, res:Response) => {
  const {email} = req.body;
  try {
    const companies = await companyModel.find({email: email});
    if(!companies){
      res.status(401).send("No company registered till now");
      return ;
    }
    else{
      res.status(200).send(companies);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
