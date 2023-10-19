import express from "express";
import { getMasterCode } from "../controllers/masterCode.controller";

export const masterCodeRoute = express.Router();

masterCodeRoute.get("/", getMasterCode);
