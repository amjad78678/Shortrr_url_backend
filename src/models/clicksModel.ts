import mongoose, { Schema, Document, Model } from "mongoose";

const ClicksSchema: Schema = new Schema<Document | any>(
  {
    url_id: {
      type: Schema.Types.ObjectId,
      ref: "Url",
    },

    city: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClicksModel: Model<Document | any> = mongoose.model(
  "Clicks",
  ClicksSchema
);

export default ClicksModel;
