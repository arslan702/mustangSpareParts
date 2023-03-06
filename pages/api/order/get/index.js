import Order from "@/models/order";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getOrders(req, res)
      break;
  }
}

const getOrders = async(req, res) => {
  try {
    let orders;
    const PAGE_SIZE = 8;
    const page = parseInt(req.query.page || "1");
    const total = await Order.countDocuments({});
    let myArray = [];
    let search = '';
    req.query.search?.includes(":") ? myArray = req.query.search.split(":") : myArray = new RegExp(req.query.search, 'i');
    console.log({myArray})
    if(req.query.field != undefined) {
      orders = await Order.find(
        {[req.query.field]: myArray}
      ).limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));
    } else {
      orders = await Order.find().limit(PAGE_SIZE).skip(PAGE_SIZE * (page - 1));
    }
    res.status(201).json({
      totalOrders: total,
      pageSize: PAGE_SIZE,
      orders
    })
    console.log(orders)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
}