import { Request, Response } from "express";
import { selectMasterCode } from "../models/masterCode.model";

export const getMasterCode = async (req: Request, res: Response) => {
  try {
    console.log("GET /master-code");

    const query = req.query;
    let category = query.category;
    let className = query.class;

    if (typeof category === "string" && typeof className === "string") {
      let data = await selectMasterCode(category, className);
      console.log("Success");

      return res.status(200).json(data);
    }
    throw new Error("bug bro");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json(err);
    }
  }
};
