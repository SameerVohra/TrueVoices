import { Request, Response } from "express";
import mongoose from "mongoose";
import companyModel from "../models/Company";
import reviewModel from "../models/Review";

const ApproveReview = async (req: Request, res: Response) => {
  const { compId, review, revId } = req.body; 
  console.log(compId, review, revId);
  try {
    const comp = await companyModel.findOne({ companyId: compId });

    if (!comp) {
      return res.status(404).send("Company not found");
    }

    const rev = await reviewModel.findOneAndUpdate(
      { _id: revId, approved: false },
      { approved: true },
      { new: true }
    );

    if (!rev) {
      return res.status(404).send("Review not found or already approved");
    }

    // Add the approved review to the company's reviews array
    comp.reviews.push(review);
    await comp.save();

    res.status(200).send("Review approved and added to company");
  } catch (error) {
    console.error("Error approving review:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default ApproveReview;
