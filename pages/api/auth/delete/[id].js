import User from "../../../../models/auth";
import connectMongo from "../../../../utils/connectDB";
import mongoose from "mongoose";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "DELETE":
      await deleteUser(req, res)
      break;
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id.");

  await User.findByIdAndRemove(id);

  res.json({ message: "user deleted" });
};