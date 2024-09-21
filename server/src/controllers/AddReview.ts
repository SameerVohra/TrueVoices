import { Request, Response } from "express";
import companyModel from "../models/Company";

export const AddReview = async (req: Request, res: Response) => {
  const { username, review, rating, compId } = req.body;

  try {
    const comp = await companyModel.findOne({ companyId: compId });
    if (!comp) {
      return res.status(404).send("Company not found");
    }

    comp.reviews.push({ username, rating, review, compId, approved: false });

    await comp.save();

    res.status(200).send("Review added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
