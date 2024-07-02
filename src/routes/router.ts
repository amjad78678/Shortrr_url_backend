import express from "express";
import { Home } from "../controllers/controller";

const router = express.Router()

router.get('/',(req,res)=>Home(req,res))

export default router