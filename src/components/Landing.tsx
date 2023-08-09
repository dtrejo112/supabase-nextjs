// @ts-nocheck
"use client";

import * as React from 'react';
import { Grid, Button, TextField, Alert, Box} from '@mui/material';
import Image from 'next/image';
import doctor from '../../public/Doctor_Two Color.png';
import supabase from '../../supabase';
import { useState } from 'react';
import { validate, res } from 'react-email-validator';

export default function Landing() {
    const [email, setEmail] = useState(null);
    const [invalid, setinValidEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const getURL = () => {
        let url =
          process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
          process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
          'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
        return url
      }
      
    const login = async () => {
        validate(email);
       if(res && email !='') {
        setSuccess(true);
       }
       else {
        setinValidEmail(true);
       }

        try {
            setLoading(true);
            let { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: getURL(),
                  },

            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            
        }
    }
    return (
        <Grid
            container
            direction={{ sm: 'column', md: 'row'}}
            justifyContent='left'
            alignItems='left'
            sx={{ml: '6rem'}}

        >
        <Grid container direction={{xs: 'row', md: 'column'}} xs={6} sm={6} md={6}>
           <Grid item>
                <h1 style={{ maxWidth: '500px'}}> Track your migraines </h1>
                <p style={{ maxWidth: '500px', lineHeight: '1.8'}}>
                    An app to help you track your migraines. Let us help you help your doctors.
                </p>
           </Grid>
           <Grid
               item
               sx={{   
                        py: 2, 
                        display: 'flex', 
                        flexDirection:'column',
                        justifyContent:'left',
                        alignItems:'left',
                        gap: '16px'
                    }}
           >
            {(success) ? 
                
            <Alert  sx={{ maxWidth: '500px'}} 
                    severity="success" 
                    action={
                        <Button onClick={() => {setSuccess(false)}} color="inherit" size="small">
                          Try Again
                        </Button>
                      }> 
                Check Your Email! 
            </Alert> :
                ( 
                <> {invalid ? <Alert onClose={() => {setinValidEmail(false)}}sx={{ maxWidth: '500px'}} severity="error"> 
                Invalid email! Please try in the format of me@email.com. 
                </Alert> : <TextField 
                        sx={{maxWidth: '500px'}}
                        size='large'
                        label='me@email.com'
                        variant='outlined'
                        type={"email"}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    /> }</>
                    
                ) 
            }
            <Button sx={{maxWidth: '500px'}} variant='contained' size='large' onClick={login}> Log In </Button>
       
           </Grid>
           </Grid>
           <Grid item  xs={7} sm={5} md={6}>
                <Image 
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        height: 'auto',
                        margin: 'auto',
                    }}
                    src={doctor}
                    alt='doctor'
                    className='pointer'
                    placeholder='blur'
                    quality={100}
                />
           </Grid>
        </Grid>
    )
};