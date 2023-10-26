import { Request, Response } from "express";
import { selectDeviceSerial } from "../models/deviceSerial.model";

export const getDeviceSerial = async (req: Request, res: Response) => {
  try {
    console.log("GET /device-serial");

    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    if (typeof query.filter == "string" && typeof page == "string") {
      let data = await selectDeviceSerial(filter, page);
      console.log("Success");

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
