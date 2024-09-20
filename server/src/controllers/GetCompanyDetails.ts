import companyModel from "../models/Company";
import { Request, Response } from "express";
const GetCompanyDetails = async(req: Request, res: Response) => {
  const {compId} = req.body;
  try {
    const comp = await companyModel.findOne({companyId: compId});
    res.status(201).send({comp});
  } catch (error) {
    res.status(501).send("Internal server error");
  }
}

export default GetCompanyDetails;
