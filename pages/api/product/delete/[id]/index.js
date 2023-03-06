import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../../../../../utils/keys.js";
import connectMongo from "../../../../../utils/connectDB";
import Product from "@/models/product";

connectMongo();

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export default async (req, res) => {
  switch(req.method){
    case "DELETE":
      await deleteProduct(req, res)
      break;
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id)
    for (let i = 0 ; i < product.img.length ; i++) {
      await cloudinary.v2.uploader.destroy(product.img[i].public_id);
    }
    await Product.findByIdAndDelete(req.query.id);
    res.status(201).json({
      success: true,
      message: "Service deleted"
    })
  } catch (error) {
    res.status(404).json({
      error
    })
    console.log(error)
  }
};

