import express from "express";
import {
  getallpasswords,
  addnewpassword,
  editPassword,
  deletePassword,
  getPasswordDetailsById,
  decryptPassword,
  encryptPassword,
} from "../controllers/passwordManager.controller.js";

const router = express.Router();

router.get("/get-all-password/:admin_id", getallpasswords);
router.get("/get-password-by-id/:app_id", getPasswordDetailsById);
router.post("/add-new-password", addnewpassword);
router.put("/edit-password/:app_id", editPassword);
router.delete("/delete-password/:app_id", deletePassword);

router.post("/decrypt-password/:app_id", decryptPassword);
router.post("/encrypt-password/:app_id", encryptPassword);

export { router as passwordroutes };
