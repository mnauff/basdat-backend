import express from "express";
import { createAccount, getAllAccount } from "../controller/user.controller.js";

const router = express.Router();

router.get("/account", getAllAccount);
router.post("/account", createAccount);
export default router;
