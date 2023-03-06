import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../../../../../utils/keys.js";
import Category from "@/models/category";
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
      await deleteCategory(req, res)
      break;
  }
}

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.query.id)
    for (let i = 0 ; i < category.img.length ; i++) {
      await cloudinary.v2.uploader.destroy(category.img[i].public_id);
    }
    await Category.findByIdAndDelete(req.query.id);
    res.status(201).json({
      success: true,
      message: "Service deleted"
    })
  } catch (error) {
    res.status(404).json({
      error
    })
  }
};