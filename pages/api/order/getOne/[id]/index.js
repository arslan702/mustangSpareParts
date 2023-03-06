import Order from "@/models/order";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getOrder(req, res)
      break;
  }
}

const getOrder = async(req, res) => {
  try {
    console.log("params  ", req.query.id);
    const order = await Order.findById(req.query.id);

    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}