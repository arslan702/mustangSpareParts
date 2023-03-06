import { Autocomplete, Box, Button, ButtonGroup, Container, FormControl, FormControlLabel, FormLabel, MenuItem,Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import styles from './product.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

function NewProduct() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [sub, setSub] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [stock, setStock] = useState('');
  const [hot, setHot] = useState('no');
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [img, setImg] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [option, setOption] = useState([]);
  const [manufacturerOption, setManufacturerOption] = useState([]);
  const [modelOption, setModelOption] = useState([]);
  const [subCategory, setSubCategory] = useState([])
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
        setOption(res.data);
        console.log(res.data)
      })
      .catch((error) => console.log(error));
      if(category !== ''){
        axios
      .get(`/api/category/getSub/${category}`)
      .then((res) => {
        setSubCategory(res?.data?.subCategory)
        console.log(res?.data?.subCategory)
      })
      }
  }, [category, manufacturer]);

  const createProduct = ({ title, description, price, oldPrice, category, sub, model, manufacturer, stock, hot, startYear , endYear, img }) => {
    axios
      .post(`/api/product/create`, { title, description, price, oldPrice, category, sub, model, manufacturer, stock, hot, startYear, endYear, img })
      .then((res) => {
        router.push('/dashboard/products');
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImg([]);
    setImagesPreview([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProduct({ title, description, price, oldPrice, category, sub, model, manufacturer, stock, hot, startYear, endYear, img });
  };

  const back = (e) => {
    e.preventDefault();
      router.push('/dashboard/products')
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setCategory(e.target.value)
    setSub('');
  }

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily:'Open Sans', fontWeight:'600'}}> 
          New Product
        </Typography>
      </Stack>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className={classes.form}
        sx={{
          '& > :not(style)': { m: 1, width: '' },
        }}
      >
        <>
        <TextField
          className={classes.formFields}
          select
          required
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
          required
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
          onChange={(e) => setManufacturer(e.target.value)}
          value={manufacturer}
          required
          label="Manufacturer"
          type="text"
          margin="normal"
        >
          {manufacturerOption?.map((manu, index) => (
            <MenuItem key={manu?._id} value={manu?.name}>
              {manu?.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.formFields}
          select
          onChange={(e) => setModel(e.target.value)}
          value={model}
          required
          label="Model Name"
          type="text"
          margin="normal"
        >
          {modelOption?.map((mode, index) => (
            <MenuItem key={index} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          className={classes.formFields}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          label="Title"
          type="text"
          margin="normal"
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
        <br/>
        <Autocomplete
      id="year-picker"
      options={yearList}
      className={classes.formFields}
      getOptionLabel={getOptionLabel}
      value={startYear}
      onChange={handleStartYearChange}
      renderInput={(params) => <TextField {...params} label="Select Start Year" variant="outlined" />}
    />
      <Autocomplete
      id="year-picker"
      options={yearList}
      className={classes.formFields}
      getOptionLabel={getOptionLabel}
      value={endYear}
      onChange={handleEndYearChange}
      renderInput={(params) => <TextField {...params} label="Select End Year" variant="outlined" />}
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
          placeholder='Description'
          style={{padding: '10px'}}
        />
        <FormControl color='error' className={classes.formFields}>
          <FormLabel color='error' id="demo-radio-buttons-group-label" sx={{ fontFamily:'Open Sans'}}>Top Selling</FormLabel>
          <RadioGroup color='error' onChange={(e) => setHot(e.target.value)} value={hot} aria-labelledby="demo-radio-buttons-group-label" defaultValue="no" name="radio-buttons-group">
            <FormControlLabel color='error' value="yes" control={<Radio />} label="yes" />
            <FormControlLabel color='error' value="no" control={<Radio />} label="no" />
          </RadioGroup>
        </FormControl>
        <div className={classes.formFields}>
        <div className={styles.createProductFormFile}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div className={styles.createProductFormImage}>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
        </div>

        <ButtonGroup color='error' className={classes.buttons} aria-label="outlined primary button group">
          <Button onClick={(e) => back(e)} sx={{color: '#BE1818',fontFamily:"Open Sans", minWidth:"90px"}}>Back</Button>
          <LoadingButton loading={loading} variant="contained" type="submit" sx={{backgroundColor: '#BE1818',fontFamily:"Open Sans", minWidth:"90px"}}>
            Create
          </LoadingButton>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default NewProduct;

NewProduct.getLayout = function PageLayout(page) {
  return (
    <>{page}</>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexWrap: 'wrap',
 
    },
    formFields: {
      flexBasis: '45%',
      margin: '10px',
      
      [theme?.breakpoints?.down('sm')]: {
        flexBasis: '90%',
      },
    },
    nestedField: {
      flexBasis: '',
    },
    buttons: {
      flexBasis: '91.5%',
      justifyContent: 'flex-end',
    },
  })
);
