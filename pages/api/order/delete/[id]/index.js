import Order from "@/models/order";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "DELETE":
      await deleteOrder(req, res)
      break;
  }
}

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.query.id);
    res.status(201).json({
      success: true,
      message: "Order deleted"
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      error
    })
  }
};