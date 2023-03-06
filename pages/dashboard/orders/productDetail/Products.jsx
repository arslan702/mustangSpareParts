import { Button } from "@mui/material";
// import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import styles from "./detail.module.css";

const ProductDetails = ({id, quantity}) => {
  const navigate = useRouter();
  // let { id } = navigate.query;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [sub, setSub] = useState('');
  const [stock, setStock] = useState(0);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/product/getOne/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setTitle(result?.title);
        setDescription(result?.description);
        setPrice(result?.price);
        setOldPrice(result?.oldPrice);
        setModel(result?.model);
        setCategory(result?.category);
        setSub(result?.sub);
        setStock(result?.stock);
        setStartYear(result?.startYear);
        setEndYear(result?.endYear);
        setImg(result?.img)
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [id]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {/* <MetaData title={`${product.name} -- ECOMMERCE`} /> */}
          <div className={styles.ProductDetails}>
            <div>
              <Carousel className={styles.carouse}>
                {img &&
                  img.map((item, i) => (
                    <img
                      className={styles.CarouselImage}
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      // height={300}
                      // width={500}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className={styles.detailsBlock1}>
                <h2>{title}</h2>
              </div>
              <div className={styles.detailsBlock3}>
                <div>
                <h3>{price}</h3>{oldPrice > 0 ? <h3><del>{oldPrice}</del></h3>: ''}
                </div>
                <div className={styles.detailsBlock31}>
                </div>

                <p>
                  Stock:
                  <b className={stock < 1 ? `${styles.redColor}` : `${styles.greenColor}`}>
                    {stock}
                  </b>
                </p>
              </div>
              <div className={styles.detailsBlock4}>
                Model : <p>{category}</p>
              </div>
              <div className={styles.detailsBlock4}>
                Category : <p>{category}</p>
              </div>
              <div className={styles.detailsBlock4}>
                Sub Category : <p>{sub}</p>
              </div>
              <div className={styles.detailsBlock4}>
                Quantity Ordered : <p>{quantity}</p>
              </div>
              <div className={styles.detailsBlock4}>
                Suitable For : <p>From Year {startYear} to {endYear}</p>
              </div>
              <div className={styles.detailsBlock4}>
                Description : <p>{description}</p>
              </div>
            </div>
          </div>
          {/* <Button onClick={(e) => back(e)} style={{alignContent: 'flex-start', width: '100px'}}>Back</Button> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

ProductDetails.getLayout = function PageLayout(page) {
  return <>{page}</>;
};