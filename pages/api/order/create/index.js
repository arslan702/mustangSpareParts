import Order from "@/models/order";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await createOrder(req, res)
      break;
  }
}

const createOrder = async(req, res) => {
  console.log(req.body)
  try {
    const newOrder = await Order.create(req.body)
    res.status(201).json(newOrder)
  } catch (error) {
    console.log(error);
    res.status(404).json(error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  },
};