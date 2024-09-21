import mongoose, { Document, Schema, Model } from "mongoose";

interface Review {
  username: string;
  rating: number;
  review: string;
  compId: string;
  approved: boolean;
}

interface Company extends Document {
  compName: string;
  reviewURL: string;
  email: string;
  companyId: string;
  about: string;
  compURL: string;
  reviews: Review[];
}

const reviewSchema: Schema = new mongoose.Schema({
  username: { type: String},
  rating: { type: Number},
  review: { type: String},
  compId: { type: String},
  approved: { type: Boolean, default: false }
});

const companySchema: Schema = new mongoose.Schema({
  compName: { type: String},
  reviewURL: { type: String},
  email: { type: String},
  companyId: { type: String},
  about: { type: String },
  compURL: { type: String },
  reviews: [reviewSchema]
});

const companyModel: Model<Company> = mongoose.model<Company>("Company", companySchema);

export default companyModel;
