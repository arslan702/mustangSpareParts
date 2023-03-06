import React, { useEffect, useState } from "react";
import styles from "./brand.module.css";
import { Box } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import Image from "next/image";
import img from "../../Images/Brands/1.jpeg";
import img1 from "../../Images/Brands/2.jpeg";
import img2 from "../../Images/Brands/3.jpeg";
import img3 from "../../Images/Brands/4.jpeg";
import img4 from "../../Images/Brands/5.jpeg";
import img5 from "../../Images/Brands/6.jpeg";
import img6 from "../../Images/Brands/7.jpeg";
import img7 from "../../Images/Brands/8.jpeg";
import img8 from "../../Images/Brands/9.jpeg";
import img9 from "../../Images/Brands/10.jpeg";
import img10 from "../../Images/Brands/11.jpeg";
import img11 from "../../Images/Brands/12.jpeg";
import { useRouter } from "next/router";
import axios from "axios";

export default function Brands() {
  const router = useRouter();
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/model/get`)
      .then((res) => {
        setBrand(res?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (e, categ) => {
    e.preventDefault();
    router.push(`a/?category=${encodeURIComponent(categ)}`)
  }
  return (
    <Box>
      <Container>
        <Grid>
          <Typography align="center" variant="h4">
           <b> Browse by Manufacture</b>
          </Typography>
        </Grid>
        <br />
        <br />
        <Grid container>
        {brand?.map((bran) => (
          <Grid key={bran?._id} onClick={(e) => handleClick(e, bran?.name)} item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={bran?.img[0]?.url} width={200} height={200} className={styles.img} />
              <Typography className={styles.brandname}>{bran?.name}</Typography>
            </Card>
          </Grid>
          ))}
          {/* <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img1} className={styles.img} />
              <Typography className={styles.brandname}>BMW</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img2} className={styles.img} />
              <Typography className={styles.brandname}>Datsun</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img3} className={styles.img} />
              <Typography className={styles.brandname}>Faw</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img4} className={styles.img} />
              <Typography className={styles.brandname}>Hino</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img5} className={styles.img} />
              <Typography className={styles.brandname}>Honda</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img6} className={styles.img} />
              <Typography className={styles.brandname}>Hyundai</Typography>
            </Card>
          </Grid> <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img7} className={styles.img} />
              <Typography className={styles.brandname}>Kia</Typography>
            </Card>
          </Grid> <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img8} className={styles.img} />
              <Typography className={styles.brandname}>Mercedeze</Typography>
            </Card>
          </Grid> <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img9} className={styles.img} />
              <Typography className={styles.brandname}>Nissan</Typography>
            </Card>
          </Grid> <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img10} className={styles.img} />
              <Typography className={styles.brandname}>Peugot</Typography>
            </Card>
          </Grid>
          <Grid item xs={3} sm={3} md={2} lg={2}>
            <Card className={styles.card}>
              <Image src={img11} className={styles.img} />
              <Typography className={styles.brandname}>Sangyoung</Typography>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
