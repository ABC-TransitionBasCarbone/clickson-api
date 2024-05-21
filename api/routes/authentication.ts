import express from "express";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { forgotPassword, resetPassword, signin } from "../controllers/authentication";

const router = express.Router();

router.post("/signin", signin);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

export default router;
