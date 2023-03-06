import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema(
  {
    category: {
      type: String,
    },
    subCategory: {
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

const Category = models.Category || model("Category", CategorySchema);
export default Category;