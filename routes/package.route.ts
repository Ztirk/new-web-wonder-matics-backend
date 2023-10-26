import express from "express";
import { getPackage } from "../controllers/package.controller";

export const packageRoute = express.Router();

packageRoute.get("/", getPackage);
