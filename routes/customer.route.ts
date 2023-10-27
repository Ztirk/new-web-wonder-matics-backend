import express from "express";
import { getCustomer, getIndividualCustomer } from "../controllers/customer.controller";

export const customerRoute = express.Router();

customerRoute.get("/", getCustomer);
customerRoute.get("/:customer_id", getIndividualCustomer);
