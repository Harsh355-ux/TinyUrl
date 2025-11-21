import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_clicked: { type: Date, default: null },
  deleted: { type: Boolean, default: false }
});

export const Link = mongoose.model("Link", LinkSchema);
