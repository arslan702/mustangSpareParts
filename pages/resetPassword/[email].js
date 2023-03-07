import { Alert, Box, Button, ButtonGroup, Container, Modal, Stack, TextField, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ResetPassword() {
  const classes = useStyles();
  const router = useRouter();
  const { email } = router.query;
  console.log(email)
  const [newPassword, setNewPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    axios.get(`/api/auth/getSingle/?email=${encodeURIComponent(email)}`)
    .then((res) => {
      console.log(res.data)
      setUserId(res?.data?._id)
    })
  }, [email]);

  console.log(userId)

  const updatePassword = (password) => {
    axios.post(`/api/auth/passwordUpdate/?userId=${userId}`, {password})
    .then((res) => {
      router.push('/login')
    })
    .catch((err) => {
      console.log(err)
      setError(err)
      setModalOpen(true)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(newPassword)
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
          Update Password
        </Typography>
      </Stack>
      <Box
        component="form"
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <>
          <input style={{width: '50%', margin: '10px', padding: '10px', height: '40px', borderRadius: '3px'}} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password" type="text" margin="normal" />
        </>
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
          <Button variant="contained" type='submit'  style={{fontFamily:"Open Sans", minWidth:"90px"}}>Update</Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
}

export default ResetPassword;

ResetPassword.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formFields: {
      flexBasis: '40%',
      margin: '10px',
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
