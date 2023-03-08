import Contact from "@/models/contact";
import connectMongo from "../../../../../utils/connectDB";

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
    // console.log("params  ", req.query.id);
    const contact = await Contact.findById(req.query.id);

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}