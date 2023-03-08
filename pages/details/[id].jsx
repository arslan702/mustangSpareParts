import React, { useEffect, useState } from "react";
import styles from "./details.module.css";
import { Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { Card, Box, Button, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel/dist";

export default function Details() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [sub, setSub] = useState('');
  const [model, setModel] = useState('');
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const [stock, setStock] = useState(0);
  const [img, setImg] = useState([]);
  const [cart, setCart] = useState({productId: '', title: '', img: '', price: '', quantity: 1})

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
        setCategory(result?.category);
        setSub(result?.sub);
        setModel(result?.model);
        setStartYear(result?.startYear);
        setEndYear(result?.endYear)
        setStock(result?.stock);
        setImg(result?.img)
        setCart({...cart, productId: result?._id, title: result?.title, img: result?.img[0]?.url, price: result?.price})
      })
      .catch((error) => console.log('error', error));
  }, [id]);

  let incNum =()=>{
    if(cart?.quantity < stock)
    {
    setCart({ ...cart, quantity: Number(cart?.quantity)+1});
    }
  };
  let decNum = () => {
     if(cart?.quantity > 1)
     {
      setCart({ ...cart, quantity: Number(cart?.quantity - 1)});
     }
  }

  const addToCart = (e) => {
    // e.preventDefault();
    // let parser = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    // console.log({parser})
    // if(!parser.length) {
    //   // store = [cart]
    //   const jsonCart = JSON.stringify([cart])
    //   console.log({cart, jsonCart})

    //   localStorage.setItem('cart', jsonCart)
    // } else {

    //   const jsonCart = [ ...parser , cart];
    //   localStorage.setItem('cart',JSON.stringify(jsonCart || []))
    // }
    // window.location.href = '/cart'
    router.push('/contact')
  }

  return (
    <div>
      <div className={styles.detailsimg}></div>

      <div className={styles.details}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card className={classes.card}>
              <Carousel className={styles.carouse}>
                {img &&
                  img.map((item, i) => (
                    <img
                      className={styles.CarouselImage}
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))
                }
              </Carousel>
            </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <div className={styles.description}>
                <Box>
                  <Typography className={styles.detail}>
                    {" "}
                    <b>{title}</b>{" "}
                  </Typography>
                  <br />
                  <Typography
                    sx={{ color: "#969696" }}
                    className={styles.detail}
                  >
                    {" "}
                    {oldPrice > 0 ? <del>{oldPrice}$</del> : ''} <span className={styles.newprice}>{price}$</span>{" "}
                  </Typography>

                  <ul>
                    <li className={styles.desdetails}>
                      <b>Model:</b> {model}
                    </li>
                    <li className={styles.desdetails}>
                      <b>Model Year:</b> Suitable for {startYear} to {endYear}{' '}{model} {model == 'All' ? 'models' : 'model'}
                    </li>
                    <li className={styles.desdetails}>
                      <b>Stock:</b> {stock > 0 ? 'InStock' : 'Out of Stock'}
                    </li>
                    <br />
                    <li className={styles.desdetails}>
                      {description}
                    </li>
                    <br />
                  </ul>

                  <Box>
                    <h5 className={styles.qtyhead}>Quantity:</h5>
                    <div className={styles.qty}>
                      <span onClick={decNum} className={styles.qtydetail}>-</span>{" "}
                      <span className={styles.qtydetail}>{cart?.quantity}</span>{" "}
                      <span onClick={incNum} className={styles.qtydetail}>+</span>
                    </div>
                  </Box>
                  <br/>
                  <Box>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={addToCart}
                      fullwidth
                      sx={{ backgroundColor: "#5C727D", color: "white" }}
                    >
                      Want to buy?
                    </Button>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    carouse: {
      width: '100%',
    },
    btn: {
      "&:hover": {
        color: "rgb(149, 142, 151)",
        marginLeft: "2pt",
        backgroundColor: "rgb(255, 163, 241)",
      },
      backgroundColor: "#dfc5e7", 
      color: "rgb(189, 61, 224)",
    },
    card: {
      width: "90%" ,
      height:"500px",
      margin: '1rem 1rem 1rem 1rem', 
      backgroundColor:"#F0F2F2",
      [theme.breakpoints.down('sm')]:{
        height: '350px',
      },
    },
    description: {
      color: 'rgb(56, 53, 53)',
      lineHeight: '24px',
      fontSize: '0.8rem',
      fontWeight: 'lighter',
    },
  })
);