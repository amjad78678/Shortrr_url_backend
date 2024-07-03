import { Document, Schema } from "mongoose";

interface IUrl extends Document {
    user_id: Schema.Types.ObjectId;
    original_url: string;
    short_url?: string;
    custom_url: string;
    title: string;
    qrCode: string;
  }

  export default IUrl