import { db } from "../connection/db.js";
import bcrypt from "bcrypt";

const tablename = "adminusers";

const getAdminUsers = (req, res) => {
  res.send("List of Admin Users");
};

const addAdmin = (req, res, next) => {
  try {
    let payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    bcrypt
      .hash(req.body.password, 8)
      .then((hash) => {
        payload.password = hash;
      })
      .then(async () => {
        let adduser_SQL = `INSERT INTO ${tablename} SET ?`;

        db.query(adduser_SQL, payload, (err) => {
          if (err)
            return res.status(400).send({
              status: 400,
              message: "error adding the admin",
              error: err,
            });

          return res
            .status(200)
            .send({ status: 200, message: "Added the admin successfully!" });
        });
      });
  } catch (error) {
    console.log(
      "🚀 ~ file: adminUsers.controller.js:10 ~ addAdmin ~ error:",
      error
    );
    next(error);
  }
};

const login = (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let sql = `SELECT * FROM ${tablename} WHERE email = ?`;
    db.query(sql, email, (err, result) => {
      if (err)
        return res
          .status(400)
          .send({ status: 400, message: "err getting user", error: err });

      if (result.length === 0) {
        return res.status(400).send({ status: 400, message: "user not found" });
      }

      bcrypt.compare(password, result[0].password).then((isMatch) => {
        let payload = {
          admin_id: result[0].admin_id.toString(),
        };
        if (isMatch === false) {
          return res
            .status(400)
            .send({ status: 400, message: "password is incorrect" });
        }
        return res.status(200).send({
          status: 200,
          message: "Logged in successfully",
          data: result,
        });
      });
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: adminUsers.controller.js:52 ~ login ~ error:",
      error
    );
    next(error);
  }
};

export { getAdminUsers, addAdmin, login };
