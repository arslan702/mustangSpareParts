import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: 'inactive',
    },
    role: {
      type: String,
      default: 'user',
    }
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
