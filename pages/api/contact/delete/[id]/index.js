import Contact from "@/models/contact";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "DELETE":
      await deleteInfo(req, res)
      break;
  }
}

const deleteInfo = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.query.id);
    res.status(201).json({
      success: true,
      message: "model deleted"
    })
  } catch (error) {
    res.status(404).json({
      error
    })
  }
};