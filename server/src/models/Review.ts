import mongoose, {Model, Schema, Document} from "mongoose"

interface rev extends Document{
  review: string,
  rating: string,
  username: string,
}

const review: Schema = new mongoose.Schema({
  username: {type: String},
  rating: {type: String},
  review: {type: Number}
})

const reviewModel: Model<rev> = mongoose.model<rev>("ReviewModel", review)

export default reviewModel;
