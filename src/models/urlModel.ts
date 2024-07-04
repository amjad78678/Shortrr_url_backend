import mongoose, { Schema, Document, Model } from "mongoose";
import ClicksModel from "./clicksModel";
import IUrl from "../interfaces/IUrl";

const UrlSchema: Schema = new Schema<Document | IUrl>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    original_url: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      trim: true,
    },
    custom_url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const UrlModel: Model<Document | IUrl> = mongoose.model<IUrl | Document>(
  "Url",
  UrlSchema
);

export default UrlModel;
