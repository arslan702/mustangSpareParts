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
    const sorts = req.query.sorts;
    const page = parseInt(req.query.page || "1");
    let total;
    let myArray = [];
    let search = "";
    req.query.search?.includes(":")
      ? (myArray = req.query.search.split(":"))
      : (myArray = new RegExp(req.query.search, "i"));

      const query = {
        title: new RegExp(req.query.search, "i"),
        manufacturer: req.query.manufacturer,
        model: req.query.model,
        startYear: { $lte: req.query.year},
        endYear: { $gte: req.query.year},
      }
    // console.log("field----   ", req.query.field);
    if (req.query.field == "searching") {
      products = await Product.find(query).limit(PAGE_SIZE);
      total = await Product.find(query).countDocuments({});
    } else if (req.query.field == "category" && req.query.sub == "sub") {
      products = await Product.find({
        $and: [{ category: req.query.brand }, { sub: req.query.category }],
      })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1));
      total = await Product.find({$and: [{ category: req.query.brand }, { sub: req.query.category }]}).countDocuments({});
    } else if (req.query.search != undefined) {
      products = await Product.find({ [req.query.field]: myArray })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
        .sort({ updatedAt: sorts });
      total = await Product.find({ [req.query.field]: myArray }).countDocuments({})
    } else {
      products = await Product.find()
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * (page - 1))
        .sort({ updatedAt: sorts });
      total = await Product.find().countDocuments({})
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
