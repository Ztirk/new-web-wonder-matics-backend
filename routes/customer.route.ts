import express from "express";
import { getCustomer } from "../controllers/customer.controller";

export const customerRoute = express.Router();

customerRoute.get("", getCustomer);
