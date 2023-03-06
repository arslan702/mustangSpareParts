import React from "react";
import styles from "./contact.module.css";
import { Box, Container } from "@mui/system";
import Grid from "@mui/system/Unstable_Grid";
import { Typography, Button } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export default function Contact() {
  const classes = useStyles();
  return (
    <Box className={styles.contact}>
      <Container>
        <center>
          <Typography className={styles.contacthead}>
            {" "}
            <b>Contact Us</b>{" "}
          </Typography>
          <Typography>
            Fill in the form below and we will get back to you ASAP.
          </Typography>
        </center>
        <br />
        <br />
        <form action="">
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{marginTop: '15px'}}>
              <label htmlFor="" className={styles.texthead}>
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className={styles.name}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} sx={{marginTop: '15px'}}>
              <label htmlFor="" className={styles.texthead}>
                Email Address
              </label>
              <input
                type="email"
                name="name"
                id="name"
                placeholder="Email"
                required
                className={styles.name}
              />
              <br />
              <br />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <label htmlFor="" className={styles.texthead}>
                Description
              </label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="3"
                className={styles.textarea}
              ></textarea>
            </Grid>
          </Grid>
        </form>
        <Box>
            <Button variant='contained' className={styles.btn} >Submit</Button>
        </Box>
        <br/>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => 
  createStyles({
    btn: {
      margin: '1rem 0',
    },
  })
)