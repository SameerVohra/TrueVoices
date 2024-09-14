import {Request, Response} from "express";
import userModel from "../models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Login = async(req: Request, res: Response): Promise<void> => {
  const {username, password} = req.body;
  console.log(`${username} ${password}`)
  try {
    if(username.trim() === "" || password.trim() === ""){
      res.status(401).send("All fields are required");
      return;
    }

    else{
      const user = await userModel.findOne({name: username})
      if(!user){
        console.log("name")
        res.status(401).send("Wrong Username or Password");
        return ;
      }
      
      else{
        if(!bcrypt.compare(password, user.password)){
          console.log(user.password);
          res.status(401).send("Wrong Username or Password");
          return ;
        }
        const tokenPayload = {
          username:user.name, userId: user._id
        }

        if(!process.env.SECRET_KEY){
          throw new Error("Secret key not defined")
        }

        const token: string = jwt.sign(
          tokenPayload,
          process.env.SECRET_KEY as string,
          {"expiresIn": "24h"}
        )
        res.status(201).send({authToken: token, email: user.email});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
