import styles from "./slider.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { responsive } from "./data";

export default function Slider({products, title}) {
  const product = products.map((item) => (
    <Product
      id={item?._id}
      name={item?.title}
      url={item?.img[0]?.url}
      price={item?.price}
      oldprice={item?.oldprice}
      description={item?.description}
    />
    
  ));

  return (
    <div>
      <h1 className={styles.trendhead} >{title}</h1>
      <br/>
      <br/>
      <Carousel  responsive={responsive}>
        {product}
      </Carousel>
    </div>
  );
}