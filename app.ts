import express from "express";
import { customerRoute } from "./routes/customer.route";
import { masterCodeRoute } from "./routes/masterCode.route";
import { personRoute } from "./routes/person.route";
import { authenticationRoute } from "./middlewares/authetication.middleware";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(authenticationRoute);
app.use("/customer", customerRoute);
app.use("/person", personRoute);
app.use("/master-code", masterCodeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`);
});