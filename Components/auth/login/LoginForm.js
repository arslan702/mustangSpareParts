import { useState } from 'react';
import {
  Link,
  Stack,
  InputAdornment,
  TextField,
  Alert,
  Modal,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setLoad(true);
    axios
      .post(`/api/auth/login`, { email, password })
      .then((res) => {
        const decode = jwtDecode(res.data.token);
        localStorage.setItem('info', JSON.stringify(res.data))
        localStorage.setItem('user', JSON.stringify(decode))
        window.location.href = '/dashboard/products';
        setLoad(false);
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
        <TextField name="email" label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
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
      <LoadingButton loading={load} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
