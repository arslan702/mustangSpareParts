import Contact from "@/models/contact";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await createContactInfo(req, res)
      break;
  }
}

const createContactInfo = async(req, res) => {
  // console.log(typeof req , {body:req.body.subCategory})
  try {
    const contact = await Contact.create(req.body)
    res.status(201).json(contact)
  } catch (error) {
    console.log(error);
    res.status(404).json(error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb'
    }
  },
};