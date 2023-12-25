import { Request, Response } from "express";
import { selectAddress } from "../models/address.model";

export const getAddress = async (req: Request, res: Response) => {
  console.log("GET /address");
  try {
    const query = req.query;
    const filter = (query.filter as string) ?? "";
    const page = (Number(query.page) as number) ?? 0;

    let data = await selectAddress(filter, page);
    return res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");
      return res.json({ Error: err.message });
    }
  }
};
