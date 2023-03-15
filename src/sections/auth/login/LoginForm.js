import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);


  const [data, setData] = useState({
    email,
    password
  })



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = () => {
    const data = {
      email,
      password
    };
    axios.post('/api/authenficate', data)
      .then((response) => navigate('/dashboard/user'))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError({ msg: "wrong credentials" });
        } else if (error.response && error.response.status === 400) {
          setError(error.response.data.errors);
        } else {
          setError("Something went wrong. Please try again later.");
        }
      });

  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isAdmin === false && (
        <Typography variant="body2" sx={{ color: 'error.main' }}>Vous n'êtes pas un admin</Typography>
      )}

      {error && <Typography variant="body2" sx={{ color: 'error.main' }}>{error.msg}</Typography>}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
