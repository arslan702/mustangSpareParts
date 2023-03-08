import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";
import { Container, Typography, Box } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneSharpIcon from '@mui/icons-material/PhoneSharp';
import EmailIcon from "@mui/icons-material/Email";
import { createStyles, makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import axios from "axios";

export default function Footer() {
  const classes = useStyles();
  const router = useRouter();
  const [contact, setContact] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/contact/get`)
      .then((res) => {
        console.log(res.data)
        setContact(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  },[])

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/category')
  }
  return (
    <div className={styles.footer}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography variant="h4" px={2} className={classes.footerheader}>
              About the Shop
            </Typography>
            <Typography className={classes.about} pt={1}>
              {" "}
              Top quality spare parts has a wide range of premium quality BMW
              spare parts to provide the best value for money to global customers
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            className={classes.footerdetail}
          >
            <Typography variant="h4" px={3} className={classes.footerheader}>
              Help
            </Typography>
            <Typography variant="h6" className={classes.helpdetails}>
              Privacy Policy
            </Typography>
            <Typography variant="h6" className={classes.helpdetails}>
              Shipping Policy
            </Typography>
            <Typography variant="h6" className={classes.helpdetails}>
              Terms & Condition
            </Typography>
            <Typography variant="h6" className={classes.helpdetails}>
              Contact Us
            </Typography>
            <Typography variant="h6" className={classes.helpdetails}>
              Refund Policy
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            className={classes.footerdetail}
          >
            <Typography variant="h4" px={2} className={classes.footerheader}>
              Main Menu
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              All
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              Accessories
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              Engine & Parts
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              Exterior
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              Interior
            </Typography>
            <Typography onClick={(e) => handleClick(e)} variant="h6" className={classes.menudetails}>
              Lights
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            className={classes.footerdetail}
          >
            <Typography variant="h4" px={3} className={classes.footerheader}>
              Contact Us
            </Typography>
            {contact?.[0]?.phoneNo ?
            <Box className={classes.boxIcon}>
              <div className={styles.ico}>
                <PhoneSharpIcon fontSize="medium" />
              </div>
              <div className={classes.icons}>{contact?.[0]?.phoneNo}</div>
            </Box>: ''}
            {contact?.[0]?.whatsAppNo ? 
            <Box className={styles.boxIcon}>
              <div className={styles.ico}>
                <WhatsAppIcon fontSize="medium" />
              </div>
              <div className={classes.icons}>{contact?.[0]?.whatsAppNo}</div>
            </Box>
            : ''}
            {contact?.[0]?.email ? 
            <Box className={styles.boxIcon}>
              <div className={styles.ico}>
                <EmailIcon fontSize="medium" />
              </div>
              <div className={classes.icons}>{contact?.[0]?.email}</div>
            </Box>
            : ''}
          </Grid>
        </Grid>
        <Grid>
          <Typography className={styles.footerrights}>
            All rights reserved @ 2023
          </Typography>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    footerheader: {
      "&:hover": {
        cursor: "pointer",
        color: 'white'
      },
      fontWeight: '100',
      fontSize: '1.1rem',
      color: 'white',
      [theme?.breakpoints?.down("sm")]: {
        padding: '2px 0 0 1rem',
        margin: '0.7rem 0 0 0',
      }
    },
    about: {
      "&:hover": {
        color: "white",
        cursor: "pointer",
      },
      lineHeight: '25px',
      padding: '15px',
      textAlign: 'left',
      fontSize: '0.9rem',
      fontWeight: '100',
      color: 'rgb(168, 178, 184)',
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
      [theme?.breakpoints?.down("sm")]: {
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