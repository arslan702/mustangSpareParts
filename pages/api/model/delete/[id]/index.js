import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../../../../../utils/keys.js";
import Model from "@/models/model";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export default async (req, res) => {
  switch(req.method){
    case "DELETE":
      await deleteModel(req, res)
      break;
  }
}

const deleteModel = async (req, res) => {
  try {
    const category = await Model.findById(req.query.id)
    for (let i = 0 ; i < category.img.length ; i++) {
      await cloudinary.v2.uploader.destroy(category.img[i].public_id);
    }
    await Model.findByIdAndDelete(req.query.id);
    res.status(201).json({
      success: true,
      message: "model deleted"
    })
  } catch (error) {
    res.status(404).json({
      error
    })
  }
};