import '@/styles/globals.css'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { createTheme, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react';
import Dashboard from './dashboard';

export default function App({ Component, pageProps }) {
  const theme = createTheme();
  const [value, setValue] = useState()
  useEffect(() => {
    setValue(localStorage.getItem('user'))
  },[])
  if(Component.getLayout) {
    if(value == null) {
      return (Component.getLayout(<Component pageProps={pageProps}/>))
    } else {
    return (
      Component.getLayout(
      <Dashboard value={value}>
        <Component pageProps={pageProps}/>
      </Dashboard>
      )
    )
  }
  }
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Component {...pageProps} />
      <Footer/>
    </ThemeProvider>
  )
}
