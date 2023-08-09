// @ts-nocheck
"use client";
import * as React from 'react';
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import UserHeader from '../components/User/Header';
import Calendar from '../components/Calendar';
import { Event } from "@/types";
import Form from '../components/Form';
import { useAuthContext } from './context';
import supabase from '../../supabase';

export default function Home() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState<Array<Event>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      console.log(user)
      setLoading(true);
      let { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id);

      if (events) {
        console.log(data);
        setEvents(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
 useEffect(() => {
  fetchEvents();
 }, []);

  return (
    <Container>
        <Grid>
          <UserHeader />
        </Grid>
        <Grid>
          {!open && <Calendar events={events} setOpen={setOpen}/>}
          {open && <Form setEvents={setEvents} setOpen={setOpen}/> }
        </Grid>
    </Container>
  )
}
