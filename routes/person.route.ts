import express from "express";

export const personRoute = express.Router();

personRoute.get("/", (req, res) => {
  res.json("person data");
});
