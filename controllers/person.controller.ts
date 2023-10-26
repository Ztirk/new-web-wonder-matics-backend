import { Request, Response } from "express";
import { selectAllPerson, selectPerson } from "../models/person.model";

export const getPerson = async (req: Request, res: Response) => {
  try {
    console.log("GET /person");
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    if (typeof query.filter == "string" && typeof page == "string") {
      let data = await selectPerson(filter, page);
      console.log("Success");
      return res.status(200).json(data);
    } else if (
      typeof query.filter === "string" &&
      typeof page === "undefined"
    ) {
      let data = await selectAllPerson(filter);
      console.log("selectAllPerson Success");
      return res.status(200).json(data);
    }
    throw new Error("ใส่ Filter กับ Page พร้อมกันนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");
      return res.status(404).json({ Error: err.message });
    }
  }
};
