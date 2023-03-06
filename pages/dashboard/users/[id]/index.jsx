import { Box, Button, ButtonGroup, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";

function UpdateUser() {
  const classes = useStyles();
  const navigate = useRouter();
  const {id} = navigate.query;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('')
  
  const updateUserStatus = (userName, email, status, role) => {
    axios.patch(`/api/auth/update/${id}`,{userName, email, status, role})
  .then((res) => {
    navigate.push('/dashboard/users')
  })
  .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch(`/api/auth/getOne/${id}`,{
      method: "GET",
    })
    .then((response) => response.json())
    .then((result) => {
        setUserName(result?.userName);
        setEmail(result?.email);
        setStatus(result?.status);
        setRole(result?.role)
      })
    .catch((error) => console.log("error", error));
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
      updateUserStatus(userName, email, status, role);
  }

  const back = (e) => {
    e.preventDefault();
    navigate.push('/dashboard/users')
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily:'Open Sans', fontWeight:'600'}}>
            Update User Status
          </Typography>
        </Stack>
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={classes.form}
      sx={{
        "& > :not(style)": { m: 1, width: "" },
      }}
    >
      <TextField
        className={classes.formFields}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        label="Name"
        type="text"
        margin="normal"
      />
      <TextField
        className={classes.formFields}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="text"
        margin="normal"
        aria-readonly
      />
      <TextField
        className={classes.formFields}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        label="Role"
        type="text"
        margin="normal"
      />
      <FormControl className={classes.formFields}>
          <FormLabel id="demo-radio-buttons-group-label" sx={{ fontFamily:'Open Sans'}}>Status</FormLabel>
          <RadioGroup onChange={(e) => setStatus(e.target.value)} value={status} aria-labelledby="demo-radio-buttons-group-label" defaultValue="Inactive" name="radio-buttons-group">
            <FormControlLabel value="active" control={<Radio />} label="Active" />
            <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
      <ButtonGroup className={classes.buttons} aria-label="outlined primary button group">
        <Button onClick={(e) => back(e)} style={{fontFamily:"Open Sans", minWidth:"90px"}}>Back</Button>
        <Button variant="contained" type="submit" style={{fontFamily:"Open Sans", minWidth:"90px"}}>Publish</Button>
      </ButtonGroup>
    </Box>
    </Container>
  );
}

export default UpdateUser;

UpdateUser.getLayout = function PageLayout(page) {
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
    buttons: {
      flexBasis: "91.5%",
      justifyContent: 'flex-end'
    },
  })
);
