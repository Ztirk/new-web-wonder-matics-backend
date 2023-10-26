import express from "express";
import { getDeviceSerial } from "../controllers/deviceSerial.controller";

export const deviceSerialRoute = express.Router();

deviceSerialRoute.get("/", getDeviceSerial);
