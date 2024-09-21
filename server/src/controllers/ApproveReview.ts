import { Request, Response } from "express"
import companyModel from "../models/Company";

const ApproveReview = async (req: Request, res: Response) => {
  const {ind, compId} = req.body;
  try {
    const comp = await companyModel.findOne({companyId: compId});
    if(!comp){
      return res.status(501).send("Internal server error");
    }
    else{
      comp.reviews[ind].approved = true;
      await comp.save();
      res.status(201).send("Review approved");
    }
  } catch (error) {
    res.status(501).send("Internal server error");
  }
};

export default ApproveReview;
