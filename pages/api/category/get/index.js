
import Category from "@/models/category";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getCategories(req, res)
      break;
  }
}

const getCategories = async(req, res) => {
  try {
    const PAGE_SIZE = req.query.page;
    const categories = await Category.find().limit(PAGE_SIZE);
    res.status(201).json(categories)
    // console.log(categories)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
}