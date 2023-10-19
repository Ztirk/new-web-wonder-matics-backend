import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("/auth/login");
  const user = {
    username: "krit",
    password: "1234",
  };
  const sentBody = req.body;
  const sentUsername = sentBody.username;
  const sentPassword = sentBody.password;
  if (
    sentUsername &&
    sentPassword &&
    sentUsername == user.username &&
    sentPassword == user.password
  ) {
    next();
  } else {
    res.json("username, password ไม่ถูกนะแจ๊ะ");
  }
};

export const signJWT = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const token = jwt.sign(payload, "this is a serect key hehee", {
    expiresIn: "1h",
  });
  res.json(token);
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("/auth/verify");
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const verify = jwt.verify(token, "this is a serect key hehee");
      if (verify) {
        next();
      } else {
        res.json("something went wrong");
      }
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    res.status(404).json("No Token Not Verify");
  }
};
