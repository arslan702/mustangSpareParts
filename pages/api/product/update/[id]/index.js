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
    case "PATCH":
      await updateProduct(req, res)
      break;
  }
}

const updateProduct = async(req, res) => {
  try {
    let product = await Product.findById(req.query.id)
  const img = req.body.img || [];

  if((img || []).length > 0 ) {
    // deleting images from cloudinary
  for (let i = 0 ; i < product.img.length ; i++) {
    await cloudinary.v2.uploader.destroy(product.img[i].public_id);
  }
  const imagesLinks = [];

  for (let i = 0; i < img.length; i++) {
    const result = await cloudinary.v2.uploader.upload(img[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.img = imagesLinks;
  }
  if((img || []).length === 0){
    delete req.body.img
  }
  product = await Product.findByIdAndUpdate(req.query.id, req.body,{
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    product
  })
  } catch (error) {
    res.status(404).json({
      error
    })
    console.log(error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  },
};