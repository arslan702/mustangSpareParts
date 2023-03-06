import User from "../../../../models/auth";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await login(req, res)
      break;
  }
}

const login = async (req, res, next) => {
  User.findOne({ email: req?.body?.email })

  // if email exists
  .then((user) => {
    // compare the password entered and the hashed password found
    bcrypt
      .compare(req?.body?.password, user?.password)
      // if the passwords match
      .then((passwordCheck) => {

        // check if password matches
        if(!passwordCheck) {
          return res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }
        if(user?.status == 'inactive') {
          return res.status(400).send({
            message: "Your are not active user",
            error,
          })
        }
        //   create JWT token
        const token = jwt.sign(
          {
            userId: user?._id,
            userEmail: user?.email,
            userName: user?.userName
          },
          "RANDOM-TOKEN",
          { expiresIn: "2h" }
        );

        //   return success response
        res.status(200).send({
          message: "Login Successful",
          userName: user?.userName,
          email: user?.email,
          role: user?.role,
          token,
        });
      })
      // catch error if password does not match
      .catch((error) => {
        res.status(400).send({
          message: "Incorrect Credentials or Inactive User",
          error,
        });
      })
  })
  // catch error if email does not exist
  .catch((e) => {
    res.status(404).send({
      message: "Email not found",
      e,
    });
  });
}
