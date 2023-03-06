import { Box, Button, ButtonGroup, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import axios from 'axios';
import styles from '../category.module.css';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';


function UpdateCategory() {
  const navigate = useRouter();
  let { id } = navigate.query;
  const classes = useStyles();

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [values, setValues] = useState('')
  const [img, setImg] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateCategory = ( category, subCategory ,img ) => {
    setLoad(true)
    axios
      .patch(`/api/category/update/${id}`, { category, subCategory, img })
      .then((res) => {
        setLoad(false);
        navigate.push('/dashboard/category');
      })
      .catch((err) => {
        setLoad(false)
        console.log('err-', err)
      });
  };

  useEffect(() => {
    fetch(`/api/category/getOne/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setCategory(result?.category);
        setSubCategory(result?.subCategory);
        setOldImages(result?.img);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [id]);

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

  const removesubCategoryFields = (i) => {
    const newValues = [...subCategory];
    newValues?.splice(i, 1);
    setSubCategory(newValues);
  };

  const handleaddCategory = () => {
    setSubCategory([...subCategory, values])
    setValues('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(category, subCategory, img);
  };


  const back = (e) => {
    e.preventDefault();
    navigate.push('/dashboard/category');
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Open Sans', fontWeight: '600' }}>
          Update Category
        </Typography>
      </Stack>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            label="Category"
            type="text"
            margin="normal"
          />
          {subCategory?.map((sub, index) => (
            <>
            <TextField
              value={sub}
              // onChange={(e) => setSubCategory(e.target.value)}
              margin="normal"
              style = {{width: "40%"}}
            />
            <Button variant="outlined" color="error" onClick={() => removesubCategoryFields(index)}>
              <RemoveRoundedIcon/>
            </Button>
            </>
          ))}
            <>
              <TextField
                onChange={(e) => setValues(e.target.value)}
                value={values}
                label="sub Category"
                type="text"
                margin="normal"
                style = {{width: "40%"}}
              />
              <Button color="error" variant='contained' onClick={() => handleaddCategory()}><AddRoundedIcon/></Button>
            </>
          <br/>
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
          </>
          <ButtonGroup className={classes.buttons} color='error' aria-label="outlined primary button group">
            <Button onClick={(e) => back(e)} style={{ color: '#BE1818',fontFamily: 'Open Sans', minWidth: '90px' }}>
              Back
            </Button>
            <LoadingButton loading={load} variant="contained" type="submit" style={{ backgroundColor: '#BE1818',fontFamily: 'Open Sans', minWidth: '90px' }}>
              Update
            </LoadingButton>
          </ButtonGroup>
        </Box>
      )}
    </Container>
  );
}

export default UpdateCategory;

UpdateCategory.getLayout = function PageLayout(page) {
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
    textEditor: {
      flexBasis: '91.5%',
      [theme?.breakpoints?.down('sm')]: {
        flexBasis: '90%',
      },
    },
    buttons: {
      flexBasis: '91.5%',
      justifyContent: 'flex-end',
    },
  })
);
