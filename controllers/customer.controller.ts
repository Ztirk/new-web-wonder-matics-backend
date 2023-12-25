import { Request, Response } from "express";
import {
  insertCustomer,
  selectCustomer,
  selectIndividualCustomer,
} from "../models/customer.model";

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const filter = (query.filter as string) ?? "";
    const page = query.page ? Number(query.page) : null;
    console.log(filter, page);

    let data = await selectCustomer(filter, page);
    return res.json(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.json({ Error: err.message });
    }
  }
};

export const getIndividualCustomer = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const customer_id: number = Number(params.customer_id);

    let data = await selectIndividualCustomer(customer_id);
    return res.status(200).json(data);
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ Error: err.message });
    }
  }
};

export const postCustomer = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const result = await insertCustomer(body);

    return res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ Error: err.message });
    }
  }
};

export const putCustomer = async (req: Request, res: Response) => {
  try {
    return res.json();
  } catch (err) {
    if (err instanceof Error) {
      return res.json({ Error: err.message });
    }
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {

    return res.json();

  } catch (err) {
    if (err instanceof Error) {
      console.log("Failed");

      return res.json({ Error: err.message });
    }
  }
};
