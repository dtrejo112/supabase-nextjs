"use client"

import * as React from 'react';
import { Grid, Button } from '@mui/material';
import { useAuthContext } from '@/app/context';
import Avatar from '../Avatar';
import AvatarComponent from '../Avatar';
import supabase from '../../../supabase';
import {useRouter} from 'next/navigation';

export default function UserHeader() {
    const router = useRouter();
    const { user, signOut } = useAuthContext();
     const logout =  () => {
       signOut();
       router.push("/");
    };
    return (
        <Grid sx={{ my: 1}} container alignItems='center'>
            <Grid item sx={{ mr: 4}}>
                <AvatarComponent />
            </Grid>
            {user && (
                <Grid item>
                    <h1> {user.email} </h1>
                    <p style={{ marginBottom: '12px'}}> {user.email} </p>
                    <Button variant='outlined' onClick={logout}> Sign Out </Button>
                </Grid>
            )}
        </Grid>
    )
}