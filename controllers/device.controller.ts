import { Request, Response } from "express";
import { selectDevice } from "../models/device.model";

export const getDevice = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    let data;
    if (typeof filter === "string" && typeof page === "string") {
      data = await selectDevice(filter, page);
      return res.status(200).json(data);
    }
    throw new Error("ใส่ filter หรือ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({ Error: err.message });
    }
  }
};
