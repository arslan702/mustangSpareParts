import User from "../../../../models/auth";
import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await passwordUpdate(req, res)
      break;
  }
}

const passwordUpdate = async(req, res) => {
  const {userId: _id} = req.query;
  console.log(req.query.userId)
  // const userName = req?.body?.userName;
  // const status = req?.body?.status;

  bcrypt.hash(req?.body?.password, 10).then(async(hashedPassword)=>{
    console.log(hashedPassword)
    const password = hashedPassword;
     const updatedPassword = await User.findByIdAndUpdate(
        _id,
        { password },
        { new: true }
      )
      res.json(updatedPassword)
  }).catch((err)=>  console.log({err}))
}