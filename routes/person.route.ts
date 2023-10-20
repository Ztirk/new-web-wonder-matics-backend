import express from "express";
import { getPerson } from "../controllers/person.controller";

export const personRoute = express.Router();

personRoute.get("/", getPerson);
