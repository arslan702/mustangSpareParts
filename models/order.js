import { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      }
    ],
    delivered: {
      type: String,
      default: 'not delivered'
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;