import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
export const auth = mongoose.model("User", authSchema);
