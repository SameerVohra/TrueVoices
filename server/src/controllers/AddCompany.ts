import {Request, Response} from "express";
import companyModel from "../models/Company";
export const AddCompany = async(req:Request, res:Response) => {
  const {compName, reviewURL, email} = req.body;

  try {
    if(compName.trim() === "" || email.trim() === ""){
      res.status(402).send("All fields are required");
      return ;
    }

    else{
      const company = await companyModel.findOne({email});
      const companyId: string = "function call";
      const compID = await companyModel.findOne({companyId});
      if(company){
        if(company.compName === compName)
          res.status(409).send("A company with same name already registered");
          return ;
      }

      if(compID){
        //TODO:call the function again;
      }

      else{
        const newCompany = new companyModel({
          compName: compName, 
          reviewURL: reviewURL, 
          email: email, 
          companyId: companyId,
        })

        await newCompany.save();
        res.status(201).send({companyId: companyId});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
