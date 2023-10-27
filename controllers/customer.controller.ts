import { Request, Response } from "express";
import {
  selectAllCustomer,
  selectCustomer,
  selectIndividualCustomer,
} from "../models/customer.model";

export const getCustomer = async (req: Request, res: Response) => {
  try {
    console.log("GET /customer");

    const query = req.query;
    const filter = `%${query.filter}%`;
    const page = query.page;

    if (typeof query.filter === "string" && typeof page === "string") {
      let data = await selectCustomer(filter, page);
      console.log("selectCustomer Success");
      return res.status(200).json(data);
    } else if (
      typeof query.filter === "string" &&
      typeof page === "undefined"
    ) {
      let data = await selectAllCustomer(filter);
      console.log("selectAllCustomer Success");
      return res.status(200).json(data);
    }
    console.log(page, filter);
    throw new Error("ใส่ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};

export const getIndividualCustomer = async (req: Request, res: Response) => {
  try {
    console.log("GET /customer/:customer_id");
    const params = req.params;
    const customer_id: string = params.customer_id;

    if (customer_id) {
      let data = await selectIndividualCustomer(customer_id);
      return res.status(200).json(data);
    }

    throw new Error("Something Went Wrong");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};

export const postCustomer = async (req: Request, res: Response) => {
  try {
    console.log("POST /customer");

    console.log("Success");

    return res.status(200).json();

    throw new Error("ใส่ filter หรือ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};

export const putCustomer = async (req: Request, res: Response) => {
  try {
    console.log("POST /customer");

    console.log("Success");

    return res.status(200).json();

    throw new Error("ใส่ filter หรือ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    console.log("POST /customer");

    console.log("Success");

    return res.status(200).json();

    throw new Error("ใส่ filter หรือ page มาด้วยนะแจ๊ะ");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.status(404).json({ Error: err.message });
    }
  }
};
