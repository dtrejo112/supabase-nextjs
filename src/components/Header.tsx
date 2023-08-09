// @ts-nocheck
"use client";

import * as React from 'react';
import { Grid, Button, Switch, FormControlLabel} from '@mui/material';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import AvatarComponent from './Avatar';

export default function Header({ switchTheme, user }: { switchTheme: any, user: any }) {
    const pathname = usePathname();
    return (
        <Grid sx={{ p: 3}}> 
            <Grid 
                container
                direction='row'
                justifyContent={pathname === '/' ? 'flex-start' : 'space-between'}
                alignItems='center'>
                <Grid item lg={6}>
                   <Logo />
                </Grid>   
                <Grid 
                   item
                   xs={6}
                   >
                {user && 
                    <Grid 
                       container
                       direction='row'
                       alignItems='center'
                       justifyContent='flex-end'
                      > 
                        <FormControlLabel 
                            control={
                            <Switch onChange={switchTheme} name='danny' color='primary' />
                            }
                            label='Night Mode'
                            />
                           <AvatarComponent user={user} />
                    </Grid>
                }
                </Grid>     
            </Grid>        
        </Grid>
    )
}