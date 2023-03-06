import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import styles from "@/styles/Home.module.css";
// import styles from "./products/products.module.css";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Pagination,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
// import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const classes = useStyles();
  const router = useRouter();
  const { category } = router.query;
  const { sub } = router.query;
  const { search, manufacturer, model, year } = router.query;
  const field = Object.keys(router.query);
  console.log("category---", search, model, year);
  const [expanded, setExpanded] = useState("panel1");
  const [products, setProducts] = useState([]);
  const [modelOption, setModelOption] = useState([]);
  const [manufacturerOption, setManufacturerOption] = useState([])
  const [manufactureer, setManufacturer] = useState('');
  const [title, setTitle] = useState("");
  const [modeel, setModel] = useState("");
  const [yearr, setYear] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setPageSize] = useState();
  const [acordCategory, setAcordCategory] = useState([]);

  useEffect(() => {
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
    axios
      .get(`/api/category/get`)
      .then((res) => {
        setAcordCategory(res.data);
      })
      .catch((error) => console.log(error));
    if (category != undefined) {
      axios
        .get(
          `/api/product/get?page=${page}&size=12&field=${field[0]}&search=${category}`
        )
        .then((res) => {
          setProducts(res?.data?.products);
          setTotalPages(res?.data?.totalProducts);
          setPageSize(res?.data?.pageSize);
        });
    }
    if (sub != undefined) {
      axios
        .get(
          `/api/product/get?page=${page}&size=12&field=${field[0]}&search=${sub}`
        )
        .then((res) => {
          setProducts(res?.data?.products);
          setTotalPages(res?.data?.totalProducts);
          setPageSize(res?.data?.pageSize);
        });
    }
    if (search && model && year != undefined) {
      axios
        .get(
          `/api/product/get?page=${page}&size=12&field=searching&search=${encodeURIComponent(
            search
          )}&manufacturer=${manufactureer}&model=${encodeURIComponent(model)}&year=${year}`
        )
        .then((res) => {
          setProducts(res?.data?.products);
          setTotalPages(res?.data?.totalProducts);
          setPageSize(res?.data?.pageSize);
        });
    }
  }, [page, category, sub]);

  const handleSubClick = (e, sub) => {
    e.preventDefault();
    axios
      .get(`/api/product/get?page=${page}&size=12&field=sub&search=${sub}`)
      .then((res) => {
        setProducts(res?.data?.products);
        setTotalPages(res?.data?.totalProducts);
        setPageSize(res?.data?.pageSize);
      });
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const options = manufacturerOption?.map((mode) => mode?.name) || [];
  const handleStartYearChange = (_, year) => {
    setYear(parseInt(year, 10));
  };
  const getOptionLabel = (year) => year.toString();

  const currentYear = new Date().getFullYear();
  const yearList = Array.from(
    new Array(75),
    (val, index) => currentYear - index
  );

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `/api/product/get?page=${page}&size=12&field=searching&search=${encodeURIComponent(
          title
        )}&manufacturer=${manufactureer}&model=${encodeURIComponent(modeel)}&year=${yearr}`
      )
      .then((res) => {
        setProducts(res?.data?.products);
        setTotalPages(res?.data?.totalProducts);
        setPageSize(res?.data?.pageSize);
        setTitle('');
        setManufacturer('');
        setModel('');
        setYear('');
      });
  };

  const handleDetail = (e, id) => {
    e.preventDefault();
    router.push(`/details/${id}`);
  };
  return (
    <>
      <Head>
        <title>All Car Parts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <div className={styles.productimg}>
          <div className={styles.productheader}>All Products</div>
        </div>
        {/* <Container> */}
        <Box className={styles.products}>
          <Grid container>
            <Grid item xs={12} sm={12} md={2.5} lg={2.5}>
              <Box className={styles.search}>
                <Box className={styles.searchbar}>
                  <Typography>
                    <b>Search</b>
                  </Typography>
                </Box>
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
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="small"
                        className={classes.textfield}
                      />
                    </Box>
                    <br/>
                    <Box>
                    <Autocomplete
                        select
                        size="small"
                        id="outlined-basic"
                        options={options || []}
                        required
                        getOptionLabel={(option) => option}
                        label="Manufacturer"
                        variant="outlined"
                        className={classes.textfield}
                        value={manufactureer}
                        onChange={(e, newValue) => setManufacturer(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Manufacturer" />
                        )}
                      />
                    </Box>
                    <br/>
                    <Box>
                      <Autocomplete
                        select
                        size="small"
                        id="outlined-basic"
                        options={modelOption || []}
                        required
                        getOptionLabel={(option) => option}
                        label="Model"
                        variant="outlined"
                        className={classes.textfield}
                        value={modeel}
                        onChange={(e, newValue) => setModel(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Model" />
                        )}
                      />
                    </Box>
                    <br/>
                    <Box>
                      <Autocomplete
                        id="year-picker"
                        size="small"
                        options={yearList}
                        className={classes.textfield}
                        getOptionLabel={getOptionLabel}
                        value={yearr}
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
                    <br/>
                    <Box className={styles.icon}>
                      <Button
                        onClick={handleSearch}
                        variant="contained"
                        className={classes.btn}
                      >
                        Search
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.category}>Categories</Box>
              {acordCategory?.map((acord, index) => (
                <Accordion
                  expanded={expanded === `panel+${index + 1}`}
                  onChange={handleChange(`panel+${index + 1}`)}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    className={styles.summary}
                  >
                    <Typography className={styles.cathead}>
                      {acord?.category}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {acord?.subCategory?.map((sub, index) => (
                      <Typography
                        onClick={(e) => handleSubClick(e, sub)}
                        key={index}
                        className={styles.catlist}
                      >
                        {sub}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>

            <Grid item xs={12} sm={12} md={9} lg={9}>
              <Box className={styles.producthead}>Products</Box>
              <Grid container>
                {products && products?.length === 0 ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{ marginTop: "30px" }}
                  >
                    {/* <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
                    <Typography
                      gutterbottom
                      align="center"
                      variant="h6"
                      component="div"
                      className={styles.productname}
                    >
                      No Results Found
                    </Typography>
                    {/* </div> */}
                  </Grid>
                ) : (
                  products?.map((prod) => (
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                      {/* <Link href={`/Details/${prod?._id}`}> */}
                      <Card
                        onClick={(e) => handleDetail(e, prod?._id)}
                        className={styles.card}
                      >
                        <Image
                          src={prod?.img[0]?.url}
                          width={200}
                          height={200}
                          alt="image broken"
                          className={styles.img}
                        />
                        {/* <Box className={styles.overlay}>
                        <ShoppingCartIcon className={styles.cart} />
                      </Box> */}
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            className={styles.productname}
                          >
                            {prod?.title} <br />
                          </Typography>
                          <Typography align="center">
                            {prod?.oldPrice > 0 ? (
                              <del className={styles.old}>
                                {prod?.oldPrice}$
                              </del>
                            ) : (
                              ""
                            )}{" "}
                            <span className={styles.new}>{prod?.price}$/-</span>
                          </Typography>
                        </CardContent>
                      </Card>
                      {/* </Link> */}
                    </Grid>
                  ))
                )}
              </Grid>
              {products && products?.length > 0 && (
                <Pagination
                  sx={{
                    marginTop: "30px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  count={Math.ceil(totalPages / pageSize)}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              )}
            </Grid>
          </Grid>
        </Box>
        {/* </Container> */}
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    textfield: {
      backgroundColor: 'white',
      width: '90%',
      marginLeft: '.5rem',
      borderRadius: '5rem',
    },
    btn: {
      "&:hover": {
        backgroundColor: 'rbg(75, 105, 124)',
        color: 'rgb(219, 210, 210)',
        marginRight: '2px',
      },
      fontSize: '0.7rem',
      backgroundColor: '#333333',
      height: '2.2rem',
      width: '90%',
      margin: '0.6rem',
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