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
      const generateId = (): string => {
        const str: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        let id: string = "";
        const n : number = str.length;

        while(id.length!==5){
          let ind: number = Math.floor(Math.random()*n);
          id+=str[ind];
        }

        console.log(id);
        return id;
      }
      const company = await companyModel.findOne({email});
      let companyId: string = generateId();
      const compID = await companyModel.findOne({companyId});
      if(company){
        if(company.compName === compName)
          res.status(409).send("A company with same name already registered");
          return ;
      }

      else{
        if(compID){
        companyId = generateId();
        }
        const newCompany = new companyModel({
          compName: compName, 
          reviewURL: reviewURL, 
          email: email, 
          companyId: companyId,
        })

        await newCompany.save();
        res.status(201).send({companyId: companyId, companyName: compName, companyURL: reviewURL});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
