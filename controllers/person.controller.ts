import { Request, Response } from "express";
import { selectPerson } from "../models/person.model";

export const getPerson = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    if (typeof filter == "string" && typeof page == "string") {
      let data = await selectPerson(filter, page);
      return res.status(200).json(data);
    }
    throw new Error("ใส่ Filter กับ Page พร้อมกันนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({ Error: err.message });
    }
  }
};
