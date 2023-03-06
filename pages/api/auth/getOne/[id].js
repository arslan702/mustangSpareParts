import User from "../../../../models/auth";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getUser(req, res)
      break;
  }
}

const getUser = async(req, res) => {
  try {
    // console.log("params  ", req.query.id);
    const user = await User.findById(req.query.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}