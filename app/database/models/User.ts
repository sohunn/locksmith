import { Schema, model, models } from "mongoose";
import { User } from "../../types";

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  passwords: { type: [String] },
});

// prevent HMR from overwriting the model
const userModel = models.users || model<User>("users", userSchema);
export default userModel;
