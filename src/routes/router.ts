import express from "express";
import { Login, Signup } from "../controllers/controller";

const router = express.Router();

router.post("/login", (req, res) => Login(req, res));
router.post("/signup", (req, res) => Signup(req, res));


export default router;
