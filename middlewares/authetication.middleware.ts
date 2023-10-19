import express from "express";
import {
  signJWT,
  verifyJWT,
  verifyUser,
} from "../controllers/authentication.controller";

export const authenticationRoute = express.Router();

authenticationRoute.route("/login").post(verifyUser).post(signJWT);

authenticationRoute.use("/", verifyJWT);
