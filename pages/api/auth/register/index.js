import User from "../../../../models/auth";
import bcrypt from 'bcryptjs';
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await Register(req, res)
      break;
  }
}

const Register = async (req, res) => {
  // hash the password
  bcrypt
  .hash(req?.body?.password, 10)
  .then((hashedPassword) => {
    // create a new user instance and collect the data
    const user = new User({
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: hashedPassword,
    });

    // save the new user
    user
      .save()
      // return success if the new user is added to the database successfully
      .then((result) => {
        res.status(201).send({
          message: "User Created Successfully",
          result,
        });
      })
      // catch error if the new user wasn't added successfully to the database
      .catch((error) => {
        console.log(error)
        res.status(500).send({
          message: "Error creating user",
          error,
        });
      });
  })
  // catch error if the password hash isn't successful
  .catch((e) => {
    res.status(500).send({
      message: "Password was not hashed successfully",
      e,
    });
  });
};
