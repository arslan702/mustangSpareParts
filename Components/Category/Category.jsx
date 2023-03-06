import React, { useEffect, useState } from "react";
import styles from "./category.module.css";
import { Box, Container } from "@mui/system";
import { Grid, Typography, Card } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/category/get`)
      .then((res) => {
        setCategory(res?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (e, categ) => {
    e.preventDefault();
    router.push(`a/?category=${encodeURIComponent(categ)}`)
  }
  return (
    <Box className={styles.category}>
      <Container>
        <Grid>
          <Typography variant="h4" align="center">
            <b>Category</b>
          </Typography>
        </Grid>
        <br />
        <br />
        <Grid container>
          {category?.map((cat) => (
            <Grid key={cat?._id} onClick={(e) => handleClick(e, cat?.category)} item xs={12} sm={6} md={6} lg={3}>
              <Card className={styles.card}>
                <Image
                  src={cat?.img[0]?.url}
                  width={200}
                  height={200}
                  className={styles.img}
                />
                <Typography>
                  <b>{cat?.category}</b>{" "}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
