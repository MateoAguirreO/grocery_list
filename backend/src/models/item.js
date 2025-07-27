import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  tagged: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model("Item", schema);
