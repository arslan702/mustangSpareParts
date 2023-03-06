
import Model from "@/models/model";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getModels(req, res)
      break;
  }
}

const getModels = async(req, res) => {
  try {
    const model = await Model.find();
    res.status(201).json(model)
    // console.log(categories)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
}