import { Request, Response } from "express";
import { selectMasterCode } from "../models/masterCode.model";

export const getMasterCode = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    let category = query.category;
    let className = query.class;

    if (typeof category === "string" && typeof className === "string") {
      let data = await selectMasterCode(category, className);
      return res.json(data);
    }
  } catch (err) {
    return res.json(err);
  }
};
