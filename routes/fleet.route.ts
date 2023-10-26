import express from "express";
import { getFleet } from "../controllers/fleet.controller";

export const fleetRoute = express.Router();

fleetRoute.get("/", getFleet);
