import mongoose, {Document, Schema, Model} from "mongoose";

interface company extends Document{
  compName: string,
  reviewURL: string,
  email: string,
  companyId: string,
  about: string,
  compURL: string
}

const comp: Schema = new mongoose.Schema({
  compName: {type: String},
  reviewURL: {type: String},
  email: {type: String},
  companyId: {type: String},
  about: {type: String},
  compURL: {type: String}
})

const companyModel: Model<company> = mongoose.model<company>("Company", comp);

export default companyModel;
