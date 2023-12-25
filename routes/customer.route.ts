import express from "express";
import {
  getCustomer,
  getIndividualCustomer,
  postCustomer,
} from "../controllers/customer.controller";

export const customerRoute = express.Router();

customerRoute.get("/", getCustomer);
customerRoute.get("/:customer_id", getIndividualCustomer);
customerRoute.post("/", postCustomer);
