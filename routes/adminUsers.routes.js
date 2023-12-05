import express from "express";
import {
  getAdminUsers,
  addAdmin,
  login,
} from "../controllers/adminUsers.controller.js";

const router = express.Router();

router.get("/adminlist", getAdminUsers);
router.post("/add-admin", addAdmin);
router.post("/admin-login", login);

export { router as routes };
