import User from "../../../../models/auth";
import connectMongo from "../../../../utils/connectDB";
import mongoose from "mongoose";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "PATCH":
      await updateUser(req, res)
      break;
  }
}

const updateUser = async(req, res) => {
  const { id: _id } = req.query;
  const user = req?.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No class with that id.");

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { ...user , _id },
    { new: true }
  );

  res.json(updatedUser);
}