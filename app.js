import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { db, connectDb } from "./connection/db.js";
import { routes } from "./routes/adminUsers.routes.js";
import { passwordroutes } from "./routes/passwordManager.routes.js";

const app = express();
config();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.get("/ping", (req, res, next) => {
  return res.status(200).send({ status: 200, data: "PONG" });
});

app.use("/admin", routes);
app.use("/password", passwordroutes);

connectDb()
  .then(() => {
    app.listen(PORT, (err) => {
      console.log(`Server is running on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to the server", err);
  });
