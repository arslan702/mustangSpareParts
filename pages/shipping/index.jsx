import React, { useEffect, useState } from "react";
import styles from "./shipping.module.css";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  MenuItem,
  Modal,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "stripe";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FDEDED',
  boxShadow: 24,
  borderRadius: '5px',
};

export default function Shipping() {
  const classes = useStyles();
  const [stor, setStor] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [order, setOrder] = useState({
    firstname: '',
    lastname: '',
    country: '',
    address: '',
    city: '',
    province: '',
    phoneNo: '',
    products: [{
      productId: '',
      quantity: 0,
    }],
    delivered: 'not delivered',
  });

  useEffect(() => {
    const khopta = JSON.parse(localStorage.getItem('cart') || null)
    setStor(khopta)
    const newArray = khopta?.map(item => {
      return {
        productId: item?.productId,
        quantity: item?.quantity,
      }
    }) || []
    setOrder({...order, products: [...newArray]})
  },[])
  console.log({order})

  const totalPrice = stor?.reduce((acc, item) => {
    return acc + (item.quantity * item.price);
  }, 0);

  const priceForStripe = totalPrice * 100;

  const payNow = async token => {
    try {
      const response = await axios({
        url: '/api/payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
        },
      });
      if (response.status === 200) {
        alert('payment Successful! Now Please submit the details form.')
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = () => {
    axios.post("/api/cashapp/payment", { totalPrice }).then((response) => {
      console.log(response.data);
    });
  };

  const createOrder = (order) => {
    axios
      .post(`/api/order/create`, order)
      .then((res) => {
        setOpen(true);
        setLoad(false);
        localStorage.removeItem('cart')
      })
      .catch((err) => {
        setLoad(false)
        console.log(err)
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    createOrder(order);
  };

  const continueToShopping = (e) => {
    e.preventDefault();
    router.push('/')
  } 

  return (
    <Box className={styles.shipping}>
      <Box className={styles.shipimg}></Box>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <div className={styles.form}>
              <Typography p={1}>Shipping Adress</Typography>
              <form action="" onSubmit={handleSubmit}>
                <div>
                  <input
                    // type="select"
                    required
                    id="outlined-required"
                    placeholder="Country"
                    defaultValue="England"
                    value={order?.country}
                    onChange={(e) => setOrder({...order, country: e.target.value})}
                    className={styles.adress}
                    // className={classes.adress}
                    size="small"
                  />
                  <input
                    required
                    id="outlined-required"
                    placeholder="First Name"
                    defaultValue=""
                    value={order?.firstname}
                    onChange={(e) => setOrder({...order, firstname: e.target.value})}
                    className={styles.namee}
                    // className={classes.namee}
                    size="small"
                  />
                  <input
                    required
                    id="outlined-required"
                    placeholder="Last Name"
                    value={order?.lastname}
                    onChange={(e) => setOrder({...order, lastname: e.target.value})}
                    defaultValue=""
                    className={styles.namee}
                    // className={classes.namee}
                    size="small"
                  />
                  <input
                    required
                    id="outlined-required"
                    placeholder="Address"
                    defaultValue=""
                    value={order?.address}
                    onChange={(e) => setOrder({...order, address: e.target.value})}
                    className={styles.adress}
                    // className={classes.adress}
                    size="small"
                  />
                  <input
                    required
                    id="outlined-required"
                    placeholder="City"
                    defaultValue=""
                    value={order?.city}
                    onChange={(e) => setOrder({...order, city: e.target.value})}
                    className={styles.namee}
                    // className={classes.namee}
                    size="small"
                  />
                  <input
                    id="outlined-required"
                    placeholder="State"
                    value={order?.province}
                    onChange={(e) => setOrder({...order, province: e.target.value})}
                    defaultValue=""
                    className={styles.namee}
                    // className={classes.namee}
                    size="small"
                  />
                  <input
                    type="number"
                    required
                    id="outlined-required"
                    value={order?.phoneNo}
                    onChange={(e) => setOrder({...order, phoneNo: e.target.value})}
                    placeholder="Phone"
                    defaultValue=""
                    className={styles.adress}
                    // className={classes.adress}
                    size="small"
                  />
                </div>
                <Typography p={1}>Choose Your Payment Method</Typography>
                {/* <StripeCheckout
                  stripeKey="pk_test_51MiJZrDcFnOiz5snUFVY5HX28olfVYRcSxxCX1KL63rpBexrmIObSp35EpIdzp80J8q3jBnLjp19THCqmaxKTGAv00207MiZAX"
                  // stripeKey="pk_test_51MctRTK6Bj5jFFfcNMwZhbELzASvSsjuUcsHhZhirq8PaYYeNlkCJLIo80NUslGCgK9W56hPURqZs6i5dLDG3fue00zYTuDUxl"
                  className={styles.submitbtn}
                  label="Bank Transfer"
                  billingAddress
                  shippingAddress
                  amount={priceForStripe}
                  description={`Your total is ${totalPrice}`}
                  token={payNow}
                /> */}
                {/* <Button onClick={handlePayment}>Pay With Cash App</Button> */}
                <br/>
                {open ? (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Alert severity="success">Your Message is delivered to us. We will contact you soon.</Alert>
                  </Box>
                </Modal>
              ) : (
                ""
              )}
              <LoadingButton loading={load} type='submit' variant="contained" className={classes.submitbtn}>
                <span>Submit Now</span>
              </LoadingButton>
              <Button onClick={continueToShopping} variant="contained" className={classes.submitbtn}>
                Continue to shoping
              </Button>
              </form>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5}>
            <div className={styles.total}>
              <Typography>Total</Typography>
              <Typography> 930/-</Typography>
            </div>
            <div className={styles.ship}>
              <Typography>Shipping</Typography>
              <Typography> 250/-</Typography>
            </div>
            <hr className={styles.hr} />
            <div className={styles.ship}>
              <Typography>Total</Typography>
              <Typography> 1180/-</Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    namee: {
      margin: '1rem .3rem',
      width: '1.1rem',
      [theme?.breakpoints?.down("sm")]: {
        width: '97%',
      }
    },
    adress: {
      margin: '.3rem .3rem',
      width: '97%',
      [theme?.breakpoints?.down("sm")]: {
        width: '97%',
      }
    },
    submitbtn: {
      "&:hover": {
        backgroundColor: '#525050',
      },
      margin: '.5rem .3rem',
      fontSize: '0.7rem',
      backgroundColor: '#232323',
      color: 'white',
    },
    helpdetails: {
      "&:hover": {
        cursor: "pointer",
        marginRight: "2px",
        color: 'white',
      },
      fontSize: '0.9rem',
      fontWeight: '100',
      padding: '0.7rem 0 0 1.3rem',
      color: 'rgb(168, 178, 184)',
      [theme?.breakpoints?.down("down")]: {
        padding: '0.7rem 0 0 1rem',
      }
    },
    footerdetail: {
      textAlign: 'left',
      fontWeight: '100',
      fontSize: '10px',
    },
    menudetails: {
      "&:hover": {
        color: 'white',
        cursor: 'pointer',
        marginRight: '2px',
      },
      fontSize: '0.9rem',
      fontWeight: '100',
      padding: '0.7rem 0 0 0.9rem',
      color: 'rgb(168, 178, 184)',
    },
    boxIcon: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '0.7rem',
      padding: '0rem 0 0 1.3rem',
      color: 'rgb(168, 178, 184)',
      [theme?.breakpoints?.down('md')]: {
        padding: '0rem 0 0 0.8rem',
      },
    },
    footerrights: {
      "&:hover": {
        cursor: 'pointer',
        color: 'white',
      },
      margin: 'auto',
      textAlign: 'center',
      padding: '2.3rem 0rem 1rem 0',
      fontSize: '1rem',
      color: 'rgb(168, 178, 184)',
    },
    icons: {
      "&:hover": {
        color: 'rgb(168, 178, 184)',
        cursor: 'pointer',
      },
      fontSize: '0.9rem',
      padding: '6px',
      margin: '0 5px',
    },
  })
);