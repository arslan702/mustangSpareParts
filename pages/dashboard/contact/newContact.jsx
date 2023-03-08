import { Box, Button, ButtonGroup, Container, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import styles from './product.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

function NewContact() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  const [phoneNo, setPhoneNo] = useState('');
  const [whatsAppNo, setWhatsAppNo] = useState('');
  const [email, setEmail] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [toTime, setToTime] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const createContact = ({ phoneNo, whatsAppNo, email, timeFrom, toTime }) => {
    axios
      .post(`/api/contact/create`, { phoneNo, whatsAppNo, email, timeFrom, toTime })
      .then((res) => {
        router.push('/dashboard/contact');
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createContact({ phoneNo, whatsAppNo, email, timeFrom, toTime });
  };

  const back = (e) => {
    e.preventDefault();
      router.push('/dashboard/contact')
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily:'Open Sans', fontWeight:'600'}}> 
          New Contact
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
          // required
          onChange={(e) => setPhoneNo(e.target.value)}
          value={phoneNo}
          label="PhoneNo"
          type="text"
          margin="normal"
        />
        <TextField
          className={classes.formFields}
          onChange={(e) => setWhatsAppNo(e.target.value)}
          value={whatsAppNo}
          // required
          label="WhatsApp No"
          type="text"
          margin="normal"
        />
        <TextField
          className={classes.formFields}
          // select
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email"
          type="text"
          margin="normal"
        />
        <TextField
          className={classes.formFields}
          onChange={(e) => setTimeFrom(e.target.value)}
          value={timeFrom}
          label="Schedule Time start"
          type="text"
          margin="normal"
        />
        <TextField
          className={classes.formFields}
          onChange={(e) => setToTime(e.target.value)}
          value={toTime}
          label="Schedule Time to"
          type="text"
          margin="normal"
        />
        </>

        <ButtonGroup color='error' className={classes.buttons} aria-label="outlined primary button group">
          <Button onClick={(e) => back(e)} sx={{color: '#BE1818',fontFamily:"Open Sans", minWidth:"90px"}}>Back</Button>
          <LoadingButton loading={loading} variant="contained" type="submit" sx={{backgroundColor: '#BE1818',fontFamily:"Open Sans", minWidth:"90px"}}>
            Add
          </LoadingButton>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default NewContact;

NewContact.getLayout = function PageLayout(page) {
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
