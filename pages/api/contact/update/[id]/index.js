import Contact from "@/models/contact";
import connectMongo from "../../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch(req.method){
    case "PATCH":
      await updateContact(req, res)
      break;
  }
}

export const updateContact = async(req, res) => {
  try {
    const contactUpdate = await Contact.findByIdAndUpdate(req?.query?.id, req.body, 
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      })
    res.status(200).json({
      success: true,
      contactUpdate
    })
  } catch (error) {
    res.status(404).json({
      error
    })
    console.log(error)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  },
};