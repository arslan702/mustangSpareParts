import { Alert, Box, Button, ButtonGroup, Container, Modal, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ChangePassword() {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}${router.basePath}`)
  },[])

  const templateParams = {
    to_email: email,
    reset_password_link: `${baseUrl}/resetPassword/${email}`
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send('service_syxf9ks', 'template_9lx5qpq', templateParams, 'GMVvuF6fHBXEuRQnH')
      .then((result) => {
        setModalOpen(true)
        console.log('Reset password email sent successfully', result.text);
      }, (error) => {
        console.log('Error sending reset password email', error.text);
      });
    }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FDEDED',
    boxShadow: 24,
    borderRadius: '5px',
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily:'Open Sans', fontWeight:'600'}}>
          Enter Your Email
        </Typography>
      </Stack>
      <Box
        component="form"
        className={classes.form}
      >
        <>
          <input style={{width: '50%', margin: '10px', padding: '10px', height: '40px', borderRadius: '3px'}} value={email} onChange={(e) => setEmail(e.target.value)} label="email" type="text" margin="normal" />
        </>
        {modalOpen ? (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity="success">An email is sent to you. Please check your Email.</Alert>
          </Box>
        </Modal>
      ) : (
        ''
      )}
        <ButtonGroup className={classes.buttons} aria-label="outlined primary button group">
          {/* <Button onClick={(e) => back(e)}  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Back</Button> */}
          <Button variant="contained" onClick={(e) => sendEmail(e)} type='submit'  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Submit</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default ChangePassword;

ChangePassword.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formFields: {
      flexBasis: '50%',
      margin: '10px',
      padding: '10px',
      height: '40px',
      borderRadius: '3px',
    },
    textEditor: {
      flexBasis: '91.5%',
    },
    buttons: {
      flexBasis: '91.5%',
      justifyContent: 'flex-end',
    },
  })
);
