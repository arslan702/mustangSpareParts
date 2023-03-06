import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../../../../utils/keys.js";
import connectMongo from "../../../../utils/connectDB";
import Product from "@/models/product";

connectMongo();

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export default async (req, res) => {
  switch(req.method){
    case "POST":
      // console.log('req method ',req?.method)
      await createProduct(req, res)
      break;
  }
}

const createProduct = async(req, res) => {
  // console.log('pohncha')
  // console.log(typeof req , {body:req.body})
  let img = [];

  if (typeof req.body.img === "string") {
    img.push(req.body.img);
  } else {
    img = req.body.img;
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

  // return res.status(201).json({})
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json({
      success: true,
      newProduct
    })
  } catch (error) {
    console.log(error);
    res.status(404).json(error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  },
};