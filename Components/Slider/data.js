import img from '../../Images/Accesories/1.jpeg'
import img1 from '../../Images/Accesories/2.jpeg'
import img2 from '../../Images/Brake/1.jpeg'
import img3 from '../../Images/Brake/2.jpeg'
import img4 from '../../Images/Engine Parts/2.jpeg'
import img5 from '../../Images/Engine Parts/3.jpeg'
import img6 from '../../Images/Engine Parts/4.jpeg'

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 2
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export const productData = [
  {
    id: 1,
    imageurl: img,
    name: "Colorful sneakers",
    price: "$19.99",
    oldprice: "$25",

    description: "Some text about the product.."
  },
  {
    id: 2,
    imageurl: img1,
    name: "Sport sneakers",
    price: "$21.99",
    oldprice: "$25",

    description: "Some text about the product.."
  },
  {
    id: 3,
    imageurl: img2,
    name: "iWatch",
    price: "$99.99",
    oldprice: "$105",

    description: "Some text about the product.."
  },
  {
    id: 4,
    imageurl: img3,
    name: "Water Bottle",
    price: "$14.99",
    oldprice: "$25",
    description: "Some text about the product.."
  },
  {
    id: 5,
    imageurl: img4,
    name: "Vans sneakers",
    price: "$30.99",
    oldprice: "$45",
    description: "Some text about the product.."
  },
  {
    id: 6,
    imageurl: img5,
    name: "Coco Noir",
    price: "$149.99",
    oldprice: "$155",

    description: "Some text about the product.."
  },
  {
    id: 7,
    imageurl: img6,
    name: "Sunglasses",
    price: "$38.99",
    oldprice: "$45",

    description: "Some text about the product.."
  },
  {
    id: 8,
    imageurl: img,
    name: "Dove cream",
    price: "$49.99",
    oldprice: "$55",

    description: "Some text about the product.."
  },
  {
    id: 5,
    imageurl: img1,
    name: "Vans sneakers",
    price: "$38.99",
    oldprice: "$45",

    description: "Some text about the product.."
  },
  {
    id: 6,
    imageurl: img2,
    name: "Coco Noir",
    price: "$149.99",
    oldprice: "$155",

    description: "Some text about the product.."
  },
  {
    id: 7,
    imageurl: img3,
    name: "Sunglasses",
    price: "$38.99",
    oldprice: "$45",

    description: "Some text about the product.."
  },
  {
    id: 8,
    imageurl: img4,
    name: "Dove cream",
    price: "$49.99",
    oldprice: "$55",

    description: "Some text about the product.."
  }
];


