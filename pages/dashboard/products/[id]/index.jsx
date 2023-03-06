import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../product.module.css";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

function UpdateProduct() {
  const navigate = useRouter();
  let { id } = navigate.query;
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sub, setSub] = useState();
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [stock, setStock] = useState("");
  const [hot, setHot] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [img, setImg] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [option, setOption] = useState([]);
  const [manufacturerOption, setManufacturerOption] = useState([]);
  const [modelOption, setModelOption] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/model/get`)
      .then((res) => {
        setManufacturerOption(res?.data);
      })
      .catch((error) => console.log(error))
    if (manufacturer !== '') {
      axios
      .get(`/api/model/getSub/${manufacturer}`)
      .then((res) => {
        setModelOption(res?.data?.model);
      })
      .catch((error) => console.log(error))
    }
    axios
      .get(`/api/category/get`)
      .then((res) => {
        setOption(res.data);
      })
      .catch((error) => console.log(error));
    if (category !== "") {
      axios.get(`/api/category/getSub/${category}`).then((res) => {
        setSubCategory(res?.data?.subCategory);
      });
    }
  }, [category]);

  const updateProduct = (
    title,
    description,
    price,
    oldPrice,
    category,
    sub,
    model,
    manufacturer,
    stock,
    hot,
    startYear,
    endYear,
    img
  ) => {
    axios
      .patch(`/api/product/update/${id}`, {
        title,
        description,
        price,
        oldPrice,
        category,
        sub,
        model,
        manufacturer,
        stock,
        hot,
        startYear,
        endYear,
        img,
      })
      .then((res) => {
        navigate.push("/dashboard/products");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err-", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`/api/product/getOne/${id}`, {
      method: "GET",
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
        setManufacturer(result?.manufacturer);
        setStock(result?.stock);
        setHot(result?.hot);
        setStartYear(result?.startYear);
        setEndYear(result?.endYear);
        setOldImages(result?.img);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(
      title,
      description,
      price,
      oldPrice,
      category,
      sub,
      model,
      manufacturer,
      stock,
      hot,
      startYear,
      endYear,
      img
    );
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImg([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImg((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleStartYearChange = (_, year) => {
    setStartYear(parseInt(year, 10));
  };

  const handleEndYearChange = (_, year) => {
    setEndYear(parseInt(year, 10));
  };

  const getOptionLabel = (year) => year.toString();
  console.log(startYear)

  const currentYear = new Date().getFullYear();
  const yearList = Array.from(new Array(75), (val, index) => currentYear - index);

  const handleChange = (e) => {
    // e.preventDefault();
    setCategory(e.target.value);
    setSub("");
  };

  const back = (e) => {
    e.preventDefault();
    navigate.push("/dashboard/products");
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Open Sans", fontWeight: "600" }}
        >
          Update Product
        </Typography>
      </Stack>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          className={classes.form}
          sx={{
            "& > :not(style)": { m: 1, width: "" },
          }}
        >
          <>
            <TextField
              className={classes.formFields}
              select
              onChange={handleChange}
              value={category}
              label="Category"
              type="text"
              margin="normal"
            >
              {option?.map((opt) => (
                <MenuItem key={opt?._id} value={opt?.category}>
                  {opt?.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.formFields}
              select
              onChange={(e) => setSub(e.target.value)}
              value={sub}
              label="Sub Category"
              type="text"
              margin="normal"
            >
              {subCategory?.map((sub, index) => (
                <MenuItem key={index} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.formFields}
              select
              onChange={handleChange}
              value={name}
              label="Manufacturer"
              type="text"
              margin="normal"
            >
              {manufacturer?.map((opt) => (
                <MenuItem key={opt?._id} value={opt?.name}>
                  {opt?.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.formFields}
              select
              onChange={(e) => setModel(e.target.value)}
              value={model}
              label="Model"
              type="text"
              margin="normal"
            >
              {modelOption?.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {model}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.formFields}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label="Title"
              type="text"
              margin="normal"
              // style={{ width: '82%' }}
            />
            <TextField
              className={classes.formFields}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              label="Price"
              type="text"
              margin="normal"
            />
            <TextField
              className={classes.formFields}
              onChange={(e) => setOldPrice(e.target.value)}
              value={oldPrice}
              label="Old Price"
              type="text"
              margin="normal"
            />
          </>
          <br />
          <TextField
            className={classes.formFields}
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            label="Stock"
            type="text"
            margin="normal"
          />
          <Autocomplete
            id="year-picker"
            options={yearList}
            className={classes.formFields}
            getOptionLabel={getOptionLabel}
            value={startYear}
            onChange={handleStartYearChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Start Year"
                variant="outlined"
              />
            )}
          />
          <Autocomplete
            id="year-picker"
            options={yearList}
            className={classes.formFields}
            getOptionLabel={getOptionLabel}
            value={endYear}
            onChange={handleEndYearChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select End Year"
                variant="outlined"
              />
            )}
          />
          <TextField
            className={classes.formFields}
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            label="Stock"
            type="text"
            margin="normal"
          />
          <textarea
            className={classes.formFields}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ padding: "10px" }}
          />
          <FormControl className={classes.formFields}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontFamily: "Open Sans" }}
            >
              Top Selling
            </FormLabel>
            <RadioGroup
              onChange={(e) => setHot(e.target.value)}
              value={hot}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="no"
              name="radio-buttons-group"
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
          </FormControl>
          <div className={classes.formFields}>
            <div className={styles.createProductFormFile}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div className={styles.createProductFormImage}>
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div className={styles.createProductFormImage}>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
          </div>

          <ButtonGroup
            color="error"
            className={classes.buttons}
            aria-label="outlined primary button group"
          >
            <Button
              onClick={(e) => back(e)}
              sx={{ color: '#BE1818' ,fontFamily: "Open Sans", minWidth: "90px" }}
            >
              Back
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{ backgroundColor: '#BE1818', fontFamily: "Open Sans", minWidth: "90px" }}
            >
              Update
            </LoadingButton>
          </ButtonGroup>
        </Box>
      )}
    </Container>
  );
}

export default UpdateProduct;

UpdateProduct.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: "flex",
      flexWrap: "wrap",
    },
    formFields: {
      flexBasis: "45%",
      margin: "10px",
      [theme?.breakpoints?.down("sm")]: {
        flexBasis: "90%",
      },
    },
    textEditor: {
      flexBasis: "91.5%",
      [theme?.breakpoints?.down("sm")]: {
        flexBasis: "90%",
      },
    },
    buttons: {
      flexBasis: "91.5%",
      justifyContent: "flex-end",
    },
  })
);
