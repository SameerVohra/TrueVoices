import {Request, Response} from "express";
import companyModel from "../models/Company";
export const RetrieveReview = async(req:Request, res:Response) => {
  const {compId}  = req.body;
  try {
    const comp = await companyModel.findOne({companyId: compId});
    if(!comp){
      return res.status(404).send("No such company");
    }
    else{
      res.status(201).send(comp.reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
