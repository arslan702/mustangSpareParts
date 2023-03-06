import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import {
  TextField,
  Box,
  MenuItem,
  Grid,
  Container,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "Components/Slider/Slider";
import Category from "../../Components/Category/Category";
// import { productData } from "Components/Slider/data";
import Image from "next/image";
import shipping from "../../Images/shipping.jpg";
import returns from "../../Images/returns.jpg";
import secure from "../../Images/secure.jpg";
import customer from "../../Images/customer.jpg";
import { createStyles, makeStyles } from "@mui/styles";
import Brands from "Components/Brands/Brands";
import Faq from "../../Components/Faq/Faq";
import Contact from "@/Components/Contact/Contact";
import axios from "axios";
import { useRouter } from "next/router";

export default function HomePage() {
  const classes = useStyles();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [manufacturerOption, setManufacturerOption] = useState([])
  const [modelOption, setModelOption] = useState([]);
  const [title, setTitle] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState("");
  const [year, setYear] = useState(null);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}${router.basePath}`)
    axios.get("/api/product/get?page=1&size=12").then((res) => {
      setProducts(res?.data?.products);
    });
    axios
      .get("/api/product/get?page=1&size=12&field=hot&search=yes")
      .then((res) => {
        setTopSelling(res?.data?.products);
      });

    axios
      .get(`/api/model/get`)
      .then((res) => {
        setManufacturerOption(res.data)
        console.log(res.data)
      })
    if(manufacturer !== '') {
      axios
      .get(`/api/model/getSub/${manufacturer}`)
      .then((res) => {
        setModelOption(res?.data?.model)
      })
    }
    // axios
    //   .get(`/api/model/get`)
    //   .then((res) => {
    //     setModelOption(res.data);
    //     // setLoading(false);
    //   })
    //   .catch((error) => console.log(error));
  }, [manufacturer]);

  const options = manufacturerOption?.map((mode) => mode?.name) || [];
  const handleStartYearChange = (_, year) => {
    setYear(parseInt(year, 10));
  };

  const getOptionLabel = (year) => year.toString();
  console.log(year);

  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    new Array(75),
    (val, index) => currentYear - index
  );

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`${baseUrl}/a/?search=${encodeURIComponent(title)}&manufacturer=${manufacturer}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`);
  };

  return (
    <>
      <Box>
        <Box className={styles.home}>
          <div className={styles.homeheader}>
            <center>
              <h1>Find Parts for your BMW</h1>
              <h3>
                Over hundreds of sellers and tens of thousands of products
              </h3>
            </center>
          </div>

          <Box
            className={styles.homesearch}
            component="form"
            sx={{
              "& > :not(style)": {},
            }}
            noValidate
            autoComplete="off"
          >
            <Box className={styles.input}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Search"
                  required
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={styles.textfield}
                />
              </Box>
              <Box>
                <Autocomplete
                  select
                  id="outlined-basic"
                  options={options || []}
                  required
                  getOptionLabel={(option) => option}
                  label="Manufacturer"
                  variant="outlined"
                  className={styles.textfield}
                  value={manufacturer}
                  onChange={(e, newValue) => setManufacturer(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Model" />
                  )}
                />
              </Box>
              <Box>
                <Autocomplete
                  select
                  id="outlined-basic"
                  options={modelOption || []}
                  required
                  getOptionLabel={(option) => option}
                  label="Model"
                  variant="outlined"
                  className={styles.textfield}
                  value={model}
                  onChange={(e, newValue) => setModel(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Model" />
                  )}
                />
              </Box>
              <Box>
                <Autocomplete
                  id="year-picker"
                  options={yearList}
                  className={styles.textfield}
                  getOptionLabel={getOptionLabel}
                  value={year}
                  onChange={handleStartYearChange}
                  required
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Model Year"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box onClick={handleClick} className={styles.icon}>
                <SearchIcon className={styles.ico} />
              </Box>
            </Box>
          </Box>

          <Box className={styles.quality}>
            <Container>
              <Grid container s>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box
                    style={{
                      // height: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={styles.box}
                  >
                    <Box style={{ height: "60px" }}>
                      <Image src={shipping} alt='shipping'/>
                    </Box>

                    <Box
                      style={{ height: "60px" }}
                      className={styles.shipdetails}
                    >
                      <p>Fast Shipping</p>
                      <p>Delivery within 2 Days</p>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box
                    style={{
                      // height: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={styles.box}
                  >
                    <Box style={{ height: "60px" }}>
                      <Image src={returns} alt='images'/>
                    </Box>

                    <Box
                      style={{ height: "60px" }}
                      className={styles.shipdetails}
                    >
                      <p>Free returns</p>
                      <p>within 2 Days after delivery</p>
                    </Box>
                  </Box>

                  {/* </Box> */}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box
                    style={{
                      // height: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={styles.box}
                  >
                    <Box style={{ height: "60px" }}>
                      <Image src={secure} alt='images'/>
                    </Box>

                    <Box
                      style={{ height: "60px" }}
                      className={styles.shipdetails}
                    >
                      <p>Secure payments</p>
                      <p>Multiple payment options</p>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box
                    style={{
                      // height: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={styles.box}
                  >
                    <Box style={{ height: "60px" }}>
                      <Image src={customer} alt='img'/>
                    </Box>

                    <Box
                      style={{ height: "60px" }}
                      className={styles.shipdetails}
                    >
                      <p>Customer support</p>
                      <p>7 days a week</p>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <Slider products={products} title="Products" />
      <br />
      <Slider products={topSelling} title="Top Selling Products" />
      <br />
      <Category />
      <br />
      <br />
      <Brands/>
      <br />
      <br />
      <br />
      <Faq />
      <Contact />
    </>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    img: {
      height: "100%",
      width: "100%",
      cursor: "pointer",
      boxShadow: "0px 5px 10px -5px black",
    },
    card: {
      width: "100%",
      height: "310px",
    },
    btn: {
      "&:hover": {
        color: "rgb(152, 106, 161)",
        marginLeft: "2pt",
        backgroundColor: "rgb(255, 163, 241)",
      },
    },
  })
);
