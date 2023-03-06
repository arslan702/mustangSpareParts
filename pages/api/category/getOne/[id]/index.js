import Category from "@/models/category";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getCategory(req, res)
      break;
  }
}

const getCategory = async(req, res) => {
  try {
    // console.log("params  ", req.query.id);
    const category = await Category.findById(req.query.id);

    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}