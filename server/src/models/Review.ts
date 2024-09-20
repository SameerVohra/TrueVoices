import mongoose, {Model, Schema, Document} from "mongoose"

interface rev extends Document{
  review: string,
  rating: number,
  username: string,
  companyId: string,
  approved: boolean,
}

const review: Schema = new mongoose.Schema({
  username: {type: String},
  rating: {type: Number},
  review: {type: String},
  companyId: {type: String},
  approved: {type: Boolean, default: false}
})

const reviewModel: Model<rev> = mongoose.model<rev>("ReviewModel", review)

export default reviewModel;
