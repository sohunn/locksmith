import { Document, Model, Schema, Types, model, models } from "mongoose";
import { DatabaseUser } from "../../types";

const subSchema = new Schema({
  for: String,
  value: String,
  algo: String,
  key: { type: String, required: false },
});

const userSchema = new Schema<DatabaseUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  passwords: [subSchema],
});

// prevent HMR from overwriting the model
const userModel =
  (models?.users as Model<
    DatabaseUser,
    {},
    {},
    {},
    Document<unknown, {}, DatabaseUser> &
      DatabaseUser & {
        _id: Types.ObjectId;
      },
    any
  >) || model<DatabaseUser>("users", userSchema);

export default userModel;
