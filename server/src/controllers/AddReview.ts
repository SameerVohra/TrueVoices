import { Request, Response } from "express"
import reviewModel from "../models/Review";
export const AddReview = async(req: Request, res: Response) => {
  const {name, review, stars} = req.body;
  try {
    if(name.trim() === "" || review.trim() === ""){
      res.status(400).send("All fields are required");
      return;
    }
    else{
      const newReview = new reviewModel({
        username: name, 
        rating: stars,
        review: review,
      })

      await newReview.save();
      res.status(201).send(newReview)
    }
  } catch (error) {
    console.error(error);
    res.status(501).send("Internal Server Error");
  }
}
