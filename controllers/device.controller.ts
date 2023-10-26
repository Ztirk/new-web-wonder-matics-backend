import { Request, Response } from "express";
import { selectDevice } from "../models/device.model";

export const getDevice = async (req: Request, res: Response) => {
  console.log("GET /customer");

  try {
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;

    if (typeof query.filter === "string" && typeof page === "string") {
      let data = await selectDevice(filter, page);
      console.log("Success");
      return res.status(200).json(data);
    }
    throw new Error("ใส่ filter หรือ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};
