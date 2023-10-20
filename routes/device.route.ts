import express from "express";
import { getDevice } from "../controllers/device.controller";

export const deviceRoute = express.Router();

deviceRoute.get("/", getDevice);
