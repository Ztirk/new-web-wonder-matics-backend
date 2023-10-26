import express from "express";
import { getContact } from "../controllers/contact.controller";

export const contactRoute = express.Router();

contactRoute.get("/", getContact);
