import { Request, Response } from "express";
import UserModel from "../models/userModel";
import UrlModel from "../models/urlModel";
import upload from "../utils/cloudinaryUpload";
import ClicksModel from "../models/clicksModel";

async function Login(req: Request, res: Response) {
  try {
    console.log(req.body);
    const user = await UserModel.findOne({ email: req.body.email });
    console.log("user", user);

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
        const { password, ...userWithoutPassword } = user.toObject();
        res.json({
          status: 200,
          success: true,
          message: "Successfully Logged In",
          userData: userWithoutPassword,
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

async function CreateLink(req: Request, res: Response) {
  try {
    console.log("aim reqbody", req.body);
    console.log("iam file", req.file);
    if (req.file) {
      const result = await upload(req.file.path, "Shortrr/qrCodes");
      console.log("iam result", result);
      const urlData = new UrlModel({
        user_id: req.body.user_id,
        original_url: req.body.longUrl,
        short_url: req.body.shortUrl,
        custom_url: req.body.customUrl + Math.floor(Math.random() * 1000),
        title: req.body.title,
        qrCode: result.secure_url,
      });
      const url = await urlData.save();
      if (url) {
        res.json({
          status: 200,
          success: true,
          message: "Successfully Created",
          data: url,
        });
      } else {
        res.json({
          status: 400,
          success: false,
          message: "Something went wrong",
        });
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
async function fetchUrls(req: Request, res: Response) {
  try {
    console.log("initital geting", req.params.id);
    const urlsData = await UrlModel.find({ user_id: req.params.id });
    res.json({
      status: 200,
      success: true,
      data: urlsData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
async function deleteLink(req: Request, res: Response) {
  try {
    await UrlModel.deleteOne({ _id: req.body.urlId });
    await ClicksModel.deleteMany({ url_id: req.body.urlId });
    res.json({
      status: 200,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
async function getLongUrl(req: Request, res: Response) {
  try {
    console.log("Request body:", req.body);

    const url = await UrlModel.findOne({
      $or: [
        { short_url: req.params.shortUrl },
        { custom_url: req.params.shortUrl },
      ],
    });

    console.log("Found URL data:", url);

    if (!url) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "URL not found",
      });
    }

    res.json({
      status: 200,
      success: true,
      urlData: url,
    });
  } catch (error: any) {
    console.error("Error in getLongUrl:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "An error occurred while retrieving the URL",
      error: error.message,
    });
  }
}

async function clicksCreate(req: Request, res: Response) {
  try {
    console.log("initital geting", req.body);
    const urlsData = await ClicksModel.create(req.body);
    res.json({
      status: 200,
      success: true,
      data: urlsData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}

export const fetchLinkData = async (req: Request, res: Response) => {
  try {
    console.log("initital geting", req.params.id);
    const urlsData = await UrlModel.findOne({
      _id: req.params.id,
      user_id: req.params.userId,
    });
    res.json({
      status: 200,
      success: true,
      data: urlsData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchClicksForUrl = async (req: Request, res: Response) => {
  try {
    console.log("initital geting", req.params.id);
    const urlsData = await ClicksModel.find({ url_id: req.params.id });
    res.json({
      status: 200,
      success: true,
      data: urlsData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const totalClicksData = async (req: Request, res: Response) => {
  try {
    console.log("initital geting");
    const urlsData = await ClicksModel.find().countDocuments();
    res.json({
      status: 200,
      success: true,
      data: urlsData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export {
  Login,
  Signup,
  CreateLink,
  fetchUrls,
  deleteLink,
  getLongUrl,
  clicksCreate,
};
