import {Request, Response} from "express";
import companyModel from "../models/Company";

const RemoveReview = async(req: Request, res: Response) => {
  const {ind, compId} = req.query;
  console.log(compId as string);
  try {
    const comp = await companyModel.findOne({companyId: compId as string});
    if(!comp){
      return res.status(404).send("No Such company");
    }
    else{
      const index = parseInt(ind as string, 10);
      comp.reviews[index].approved = false;
      await comp.save();
      res.status(201).send("Review Removed Successfully");
    }
  } catch (error) {
    res.status(501).send("Internal Server Error");
  }
}

export default RemoveReview;
