import { Schema, models, model } from "mongoose";

const ModelSchema = new Schema(
  {
    name: {
      type: String,
    },
    model: {
      type: [String],
    },
    img: [
      {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  },
  { timestamps: true }
);

const Model = models.Model || model("Model", ModelSchema);
export default Model;