import Link from 'next/link'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import useResponsive from '../../Components/hooks/useResponsive';
import { LoginForm } from '../../Components/auth/login';
import LoginImage from '../../Images/illustration_login.png'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme?.customShadows?.card,
  backgroundColor: theme?.palette?.background?.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme?.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const [store, setStore] = useState('');

  useEffect(() => {
    setStore(localStorage.getItem('user'));
    if(localStorage.getItem('user') !== null) {
      router.push('/dashboard/products')
    }
  },[])
  // console.log({store})
  return (
    <>
      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <Image src={LoginImage} alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to BMW Parts
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" href='/register'><b>Sign Up</b></Link>
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

LoginPage.getLayout = function PageLayout(page){
  return (
    <>{page}</>
  )
}