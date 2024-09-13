import {Request, Response} from "express";
import reviewModel from "../models/Review";
export const RetrieveReview = async(req:Request, res:Response) => {
  const {compId}  = req.body;
  try {
    const company = await reviewModel.find({companyId: compId});
    if(!company){
      res.status(404).send("No such company");
      return;
    }
    else{
      res.status(201).json(company);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
