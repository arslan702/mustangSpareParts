import User from "../../../../models/auth";
import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await PasswordCheck(req, res)
      break;
  }
}

export const PasswordCheck = async(req, res) => {
  User.findOne({ _id: req?.body?.userId})
  .then((user) => {
    bcrypt
      .compare(req?.body?.password, user?.password)
      .then((passwordCheck) => {
        if(!passwordCheck){
          return res.status(200).send({
            message: "Incorrect Password",
          })
        } else {
          return res.status(200).send({
            message: "Password matched"
          })
        }
      })
      .catch((error) => {
        res.status(400).send({
          error,
        })
      })
  })
}
