import { Schema, models, model } from "mongoose";

const ContactSchema = new Schema(
  {
    phoneNo: {
      type: String,
    },
    whatsAppNo: {
      type: String,
    },
    email: {
      type: String,
    },
    timeFrom: {
      type: String,
    },
    toTime: {
      type: String,
    }
  },
  { timestamps: true }
);

const Contact = models.Contact || model("Contact", ContactSchema);
export default Contact;