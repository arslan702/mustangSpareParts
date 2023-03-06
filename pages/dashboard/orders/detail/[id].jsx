import { Button, Card, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import styles from './detail.module.css';
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "../productDetail/Products";

const OrderDetails = () => {
  const navigate = useRouter();
  let { id } = navigate.query;

  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [products, setProducts] = useState([])
  const [delivered, setDelivered] = useState('')

  useEffect(() => {
    fetch(`/api/order/getOne/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log({result})
        setFirstName(result?.firstname);
        setLastName(result?.lastname);
        setCountry(result?.country);
        setAddress(result?.address);
        setCity(result?.city);
        setProvince(result?.province);
        setPhoneNo(result?.phoneNo);
        setProducts(result?.products);
        setDelivered(result?.delivered);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [id]);

  const back = (e) => {
    e.preventDefault();
    navigate.push('/dashboard/orders')
  }

  const updateOrderStatus = (firstname, lastname, country, address, city, province, phoneNo, products, delivered) => {
    axios
      .patch(`/api/order/update/${id}`, {firstname, lastname, country, address, city, province, phoneNo, products, delivered})
      .then((res) => {
        // navigate.push('/dashboard/products');
      })
      .catch((err) => console.log('err-', err));
  };

  const updateStatus = (e) => {
    e.preventDefault();
    updateOrderStatus(firstname, lastname, country, address, city, province, phoneNo, products, delivered);
  }

  const handleDetails = (e, id) => {
    e.preventDefault();
    navigate.push(`/dashboard/orders/productDetail/${id}`);
  };

  // console.log({order})
  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
              <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{fontFamily:"Open Sans", fontWeight:'600'}}>
          Order Details
        </Typography>
      </Stack>
      <Card sx={{p:4, display: 'flex', flexDirection: 'column',borderRadius: '12px'}}>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>First Name: <span style={{fontWeight:'400', fontSize:'17px'}}> {firstname}</span> </Typography>

      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>Last Name: <span style={{fontWeight:'400', fontSize:'17px'}}> {lastname}</span> </Typography>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>Country: <span style={{fontWeight:'400', fontSize:'17px'}}> {country}</span> </Typography>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>Address: <span style={{fontWeight:'400', fontSize:'17px'}}> {address}</span> </Typography>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>City: <span style={{fontWeight:'400', fontSize:'17px'}}> {city}</span> </Typography>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>Province: <span style={{fontWeight:'400', fontSize:'17px'}}> {province}</span> </Typography>
      <Typography variant='h6' sx={{fontFamily:"Open Sans", fontWeight:'500', margin: '3px',padding:'8px', border:'1px solid whitesmoke', borderRadius:'10px',}}>Phone No: <span style={{fontWeight:'400', fontSize:'17px'}}> {phoneNo}</span> </Typography>
      <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" sx={{ fontFamily:'Open Sans'}}>Status</FormLabel>
          <RadioGroup onChange={(e) => setDelivered(e.target.value)} value={delivered} aria-labelledby="demo-radio-buttons-group-label" defaultValue="not delivered" name="radio-buttons-group">
            <FormControlLabel value="delivered" control={<Radio />} label="delivered" />
            <FormControlLabel value="not delivered" control={<Radio />} label="not delivered" />
          </RadioGroup>
        </FormControl>
        <Button onClick={(e) => updateStatus(e)} sx={{backgroundColor: '#BE1818', alignContent: 'flex-start', width: '100px'}} variant='contained'>Update Status</Button>
      <Fragment>
        {products?.map((prod) => (
          <div key={prod?._id} className={styles.ProductDetails}>
            <div>
              <ProductDetails id={prod?.productId} quantity={prod?.quantity}/>
            {/* <button className={styles.productListEdit} onClick={(e) => handleDetails(e, prod?.productId)}>view details</button> */}
              {/* <div className={styles.carouse}>
                    <img
                      className={styles.CarouselImage}
                      src={prod?.img}
                      alt={'product image'}
                      // height={300}
                      // width={500}
                    />
              </div> */}
            </div>
            <div>
              {/* <div className={styles.detailsBlock1}>
                <h2>{prod?.title}</h2>
              </div>
              <div className={styles.detailsBlock4}>
                Price : <h4>{prod?.price}</h4>
              </div> */}
              {/* <div className={styles.detailsBlock4}>
                Quantity : <h4>{prod?.quantity}</h4>
              </div> */}
            </div>
          </div>
        ))}
        </Fragment>
      </Card>
    </Container>
          <Button onClick={(e) => back(e)} style={{alignContent: 'flex-start', width: '100px'}}>Back</Button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;

OrderDetails.getLayout = function PageLayout(page) {
  return <>{page}</>;
};