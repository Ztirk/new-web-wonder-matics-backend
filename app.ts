import express from "express";
import { customerRoute } from "./routes/customer.route";
import { masterCodeRoute } from "./routes/masterCode.route";
import { personRoute } from "./routes/person.route";
import { authenticationRoute } from "./middlewares/authetication.middleware";
import cors from "cors";
import { addressRoute } from "./routes/address.route";
import { deviceRoute } from "./routes/device.route";
import { vehicleRoute } from "./routes/vehicle.route";
import { contactRoute } from "./routes/contact.route";
import { deviceSerialRoute } from "./routes/deviceSerial.route";
import { fleetRoute } from "./routes/fleet.route";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(authenticationRoute);
app.use("/customer", customerRoute);
app.use("/person", personRoute);
app.use("/master-code", masterCodeRoute);
app.use("/address", addressRoute);
app.use("/device", deviceRoute);
app.use("/vehicle", vehicleRoute);
app.use("/contact", contactRoute);
app.use("/device-serial", deviceSerialRoute);
app.use("/fleet", fleetRoute);

app.listen(port, () => {
  console.log(`Example app listening on port:${port}`);
});
