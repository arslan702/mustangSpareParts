import { useState } from 'react';
import axios from 'axios';
import { Stack, InputAdornment, TextField, Modal, Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

export default function RegisterForm() {
  const router = useRouter();

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const handleClose = () => setOpen(false);

  const handleClick = (e) => {
    setLoad(true);
    e.preventDefault();
    axios.post(`/api/auth/register`, {userName, email, password})
    .then((res) => {
      setLoad(false);
      router.push('/login')
    })
    .catch((err) => {
      console.log(err);
      setError(err?.response?.data?.message);
      setOpen(true);
    });
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
    <>
      <Stack spacing={3}>
        <TextField name="last Name" value={userName} onChange={(e) => setUserName(e.target.value)} label="User Name" />
        <TextField name="email" value={email} onChange={(e) => setEmail(e.target.value)} label="email" />

        <TextField
          name="password"
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <span style={{cursor: 'pointer'}} onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {open ? (
        <Modal
          open={open}
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
      <LoadingButton loading={load} fullWidth size="large" sx={{ my: 2}} type="submit" variant="contained" onClick={handleClick}>
        Register
      </LoadingButton>
    </>
  );
}
