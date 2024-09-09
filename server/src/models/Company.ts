import mongoose, {Document, Schema, Model} from "mongoose";

interface company extends Document{
  compName: string,
  reviewURL: string,
  email: string,
  companyId: string,
}

const comp: Schema = new mongoose.Schema({
  compName: {type: String},
  reviewURL: {type: String},
  email: {type: String},
  companyId: {type: String},
})

const companyModel: Model<company> = mongoose.model<company>("CompanyReview", comp);

export default companyModel;
