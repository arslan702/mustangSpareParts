import { Alert, Box, Button, ButtonGroup, Container, Modal, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ChangePassword() {
  const classes = useStyles();
  const navigate = useRouter();
  const [value, setValue] = useState({});

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('info')) || null)
  }, []);

  const userId = value?.id;
  console.log({value})

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const handleClose = () => setModalOpen(false);

  const checkPassword = (userId, password) => {
    axios.post(`/api/auth/checkPassword`, {userId, password})
    .then((res) => {
      if(res?.data?.message === "Password matched"){
        setOpen(true)
      } else {
        setModalOpen(true)
        setError(res?.data?.message)
      }
    })
  }
  const handleCheck = (e) => {
    e.preventDefault();
    checkPassword(userId, password)
  }

  const updatePassword = (password) => {
    axios.post(`/api/auth/passwordUpdate/?userId=${userId}`, {password})
    .then((res) => {
      navigate.push('/dashboard')
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(newPassword)
  }

  const back = (e) => {
    e.preventDefault();
    navigate.push('/');
  };

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
          Change Password
        </Typography>
      </Stack>
      <Box
        component="form"
        className={classes.form}
        onSubmit={handleSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '' },
        }}
      >
        {!open ? 
        <>
          <TextField className={classes.formFields} value={password} onChange={(e) => setPassword(e.target.value)} label="Old Password" type="text" margin="normal" />
          <Button variant="contained" onClick={handleCheck}  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Check</Button>
        </>
        : 
        <>
          <TextField className={classes.formFields} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password" type="text" margin="normal" />
        </>
        }
        {modalOpen ? (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity="error">{error}</Alert>
          </Box>
        </Modal>
      ) : (
        ''
      )}
        <ButtonGroup className={classes.buttons} aria-label="outlined primary button group">
          <Button onClick={(e) => back(e)}  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Back</Button>
          <Button variant="contained" type='submit'  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Update</Button>
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
      flexBasis: '45%',
      margin: '10px',
      // [theme.breakpoints.down('sm')]: {
      //   flexBasis: '90%',
      // },
    },
    textEditor: {
      flexBasis: '91.5%',
      // [theme.breakpoints.down('sm')]: {
      //   flexBasis: '90%',
      // },
    },
    buttons: {
      flexBasis: '91.5%',
      justifyContent: 'flex-end',
    },
  })
);
