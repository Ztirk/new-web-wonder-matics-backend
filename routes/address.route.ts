import express from "express";
import { getAddress } from "../controllers/address.controller";

export const addressRoute = express.Router();

addressRoute.get("/", getAddress);
