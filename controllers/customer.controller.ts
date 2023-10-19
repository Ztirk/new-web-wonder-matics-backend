import { Request, Response } from "express";
import { selectCustomer } from "../models/customer.model";

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    let data;
    if (typeof filter === "string" && typeof page === "string") {
      data = await selectCustomer(filter, page);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.json(err);
  }
};
