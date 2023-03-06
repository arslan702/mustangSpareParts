// import { Schema, models, model } from "mongoose";
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    oldPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    sub: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    model: {
      type: String,
    },
    stock: {
      type: Number,
    },
    hot: {
      type: String,
      default: 'no',
    },
    startYear: {
      type: Number,
    },
    endYear: {
      type: Number,
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

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;