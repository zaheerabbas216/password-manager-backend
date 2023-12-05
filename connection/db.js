import mysql from "mysql";
import { config } from "dotenv";

config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDb = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.log("err connecting to the database", err);
        reject(err);
        return;
      }

      console.log("connected to the database successfully");
      resolve();
    });
  });
};

export { db, connectDb };
