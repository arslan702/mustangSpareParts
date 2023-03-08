import Contact from "@/models/contact";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "GET":
      await getContact(req, res)
      break;
  }
}

const getContact = async(req, res) => {
  try {
    const contact = await Contact.find();
    res.status(201).json(contact)
    // console.log(categories)
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
}