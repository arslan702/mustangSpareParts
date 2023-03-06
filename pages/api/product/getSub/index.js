import Product from "@/models/product";
import connectMongo from "../../../../utils/connectDB";

connectMongo();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    let products;
    const PAGE_SIZE = req.query.size || 8;
    // const sorts = req.query.sorts;
    const page = parseInt(req.query.page || "1");
    let total;
    // let myArray = [];
    // let search = "";
    // req.query.search?.includes(":")
    //   ? (myArray = req.query.search.split(":"))
    //   : (myArray = new RegExp(req.query.search, "i"));

    if (req.query.field == "category") {
      products = await Product.find({ category: req.query.category })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1));
      total = await Product.find({ category: req.query.category }).countDocuments({});
    } else if (req.query.field == "sub") {
      products = await Product.find({ sub: req.query.sub })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))

      total = await Product.find({ sub: req.query.sub }).countDocuments({});
    } else {
      products = await Product.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))

      total = await Product.find().countDocuments({});
    }
    res.status(201).json({
      totalProducts: total,
      pageSize: PAGE_SIZE,
      products,
    });
    // console.log(products);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};
