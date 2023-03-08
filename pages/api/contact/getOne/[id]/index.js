import Model from "@/models/model";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getModel(req, res)
      break;
  }
}

const getModel = async(req, res) => {
  try {
    // console.log("params  ", req.query.id);
    const model = await Model.findById(req.query.id);

    res.status(200).json(model);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}