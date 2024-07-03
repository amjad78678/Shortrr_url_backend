import { Request, Response } from "express";
import UserModel from "../models/userModel";

async function Login(req: Request, res: Response) {
  try {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.json({
        status: 400,
        message: "user not found",
      });
    } else {
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) {
        res.json({
          status: 400,
          message: "password incorrect",
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "Successfully Logged In",
          userData: user,
        });
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

async function Signup(req: Request, res: Response) {
  try {
    console.log(req.body);
    const existedUser = await UserModel.findOne({ email: req.body.email });
    if (existedUser) {
      res.json({ status: 400, message: "user already exist" });
    } else {
      const obj = { ...req.body };
      const user = new UserModel(obj);
      const userData = await user.save();
      res.json({
        status: 200,
        message: "Successfully Registered",
        userData,
      });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export { Login, Signup };
