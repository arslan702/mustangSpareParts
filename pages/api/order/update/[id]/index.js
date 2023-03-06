import Order from "@/models/order";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "PATCH":
      await updateOrder(req, res)
      break;
  }
}

export const updateOrder = async(req, res) => {
  try {
    // const currentOrder = await Order.findById(req.query.id)
    const orderUpdate = await Order.findByIdAndUpdate(req?.query?.id, req?.body, {new: true})
    res.status(200).json({
      success: true,
      orderUpdate
    })
  } catch (error) {
    res.status(404).json({
      error
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  },
};