// @ts-nocheck
"use client";
import './globals.scss'

import { useEffect, useState } from 'react';
import { lightTheme, darkTheme } from './theme/theme';
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../components/Header';
import Landing from '../components/Landing';
import CssBaseline from '@mui/material/CssBaseline';
import supabase from '../../supabase';
import { AuthContextProvider } from './context';
import Head from 'next/head'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const switchTheme: any = () => {
    setIsDark(!isDark);
  };
  const onAuthStateChange = async () => {
    try {
      
      const { data: { user } } = await supabase.auth.getUser();

      if(user) {
          setUser(user);
      }
    } catch (error) {
      console.log(error)
    } finally {

    }
  }
  useEffect(() => {
    onAuthStateChange();
  }, [])
  return (
    <html lang="en">
      <head>
        <title> Migraine Buddy </title>
        <meta name="description" content="An app to track migraines"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Migraine Buddy"
        />
        {/* <meta property="og:url" content="https://dannys-ux-portfolio.vercel.app/" /> */}
        <meta name="twitter:card" content="An app to track migraine" />
        <meta
          property="og:description"
          content="An app to track migraine"
        />
        <meta property="og:image" content={'../../public/headache.png'} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}> 
          <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <CssBaseline />
            <body>
             <AuthContextProvider switchTheme={switchTheme}>
                 {/* <Header switchTheme={switchTheme} user={user}/> */}
                 {!user ? <Landing /> : children}
             </AuthContextProvider>
            </body>
          </LocalizationProvider>
      </ThemeProvider>
    </html>
  )
}
