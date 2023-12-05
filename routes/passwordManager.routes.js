import express from "express";
import {
  getallpasswords,
  addnewpassword,
  editPassword,
  deletePassword,
} from "../controllers/passwordManager.controller.js";

const router = express.Router();

router.get("/get-all-password/:admin_id", getallpasswords);
router.post("/add-new-password", addnewpassword);
router.put("/edit-password/:app_id", editPassword);
router.delete("/delete-password/:app_id", deletePassword);

export { router as passwordroutes };
