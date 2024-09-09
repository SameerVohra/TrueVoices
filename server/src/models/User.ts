import mongoose, { Model, Schema, Document } from "mongoose";

interface user extends Document{
  name: string,
  email: string,
  password: string,
}

const user: Schema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  password: {type: String},
})

const userModel: Model<user> = mongoose.model<user>("UserModel", user);

export default userModel
