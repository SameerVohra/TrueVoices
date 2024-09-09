import userModel from "../models/User";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";
export const Register = async(req: Request, res: Response): Promise<void> => {
  const {username, password, email} = req.body;
  try {
    if(username.trim()==="" || password.trim()==="" || email.trim()===""){
      res.status(401).send("All fields are required");
      return ;
    }
    else{
      const user = await userModel.findOne({name: username});
      const userEmail = await userModel.findOne({email: email});
      if(user || userEmail){
        res.status(409).send("Username OR Email Already in use");
        return ;
      }
      else{
        const newUser = new userModel({
          name: username,
          email: email,
          password: bcrypt.hashSync(password, 8)
        })
        await newUser.save();
        res.status(200).send("User Registered Successfully");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
