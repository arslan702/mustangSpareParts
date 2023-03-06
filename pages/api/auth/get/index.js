import User from "../../../../models/auth";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getUsers(req, res)
      break;
  }
}

const getUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error)
  }
}
