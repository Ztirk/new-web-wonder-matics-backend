import { Request, Response } from "express";
import { selectAllVehicle, selectVehicle } from "../models/vehicle.model";

export const getVehicle = async (req: Request, res: Response) => {
  try {
    console.log("GET /vehicle");
    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;
    if (typeof query.filter == "string" && typeof page == "string") {
      let data = await selectVehicle(filter, page);
      console.log("Success");
      return res.status(200).json(data);
    } else if (
      typeof query.filter === "string" &&
      typeof page === "undefined"
    ) {
      let data = await selectAllVehicle(filter);
      console.log("selectAllVehicle Success");
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
