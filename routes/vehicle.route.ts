import express from "express";
import { getVehicle } from "../controllers/vehicle.controller";

export const vehicleRoute = express.Router();

vehicleRoute.get("/", getVehicle);
