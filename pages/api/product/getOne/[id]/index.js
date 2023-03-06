import Product from "@/models/product";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getProduct(req, res)
      break;
  }
}

const getProduct = async(req, res) => {
  try {
    console.log("params  ", req.query.id);
    const product = await Product.findById(req.query.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

