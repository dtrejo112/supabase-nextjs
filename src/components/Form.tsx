// @ts-nocheck
"use client";

import dayjs from 'dayjs';
import config from '../../config';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
         Container, 
         Grid,
         Card,
         CardContent,
         Slider,
         Stack,
         Button,
         Box,
         FormControlLabel,
         Checkbox,
         Alert
        } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Event } from '@/types';
import { LoadingButton } from '@mui/lab';
import supabase from '../../supabase';
import { useAuthContext } from '@/app/context';

type Props = {
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const marks = [
    {
      value: 24,
      label: '24H',
    },
    {
      value: 48,
      label: '48H',
    },
    {
      value: 72,
      label: '72H',
    },
  ];
  const pains = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '10',
    },
  ];

export default function Form({ setEvents, setOpen}: Props) {
    const { user } = useAuthContext();
    const locationsLength = config.locations.length;
    const symptomsLength = config.symptoms.length;
  
    const [error, setError] = useState<any>(false);
    const [loading, setLoading] = useState<any>(false);
    const [event, setEvent] = useState<Event>({
        user_id: undefined,
        date: undefined,
        duration: 1,
        locations: [],
        symptoms: [],
        medications: [],
        pain: 0,
    });
    const handleChange = (index: number, key: string) => {
        if (event[key].includes(index)) {
            setEvent(() => ({
                ...event,
                [key]: event[key].filter((x: number) => x !== index),
            }));
            return;
        }
        setEvent(() => ({
            ...event, 
            [key]: [...event[key], index],
        }));
    };

    const saveEvent = async () => {
        setError(null);
        setLoading(true);
        if (!event.date) {
            setError('You must provide a date');
            return;
        }
        try {
           
            let { data, error } = await supabase.from('events').insert(event).select();

            if (data) {
                console.log('In data loop, data not null')
                setEvents((prevEvents) => [...prevEvents, event]);
                setOpen(false);
            }
            console.log(event);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };  
    
    useEffect(() => {
       console.log(event);
    }, []);

    useEffect(() => {
        setEvent({ ...event, date: dayjs().format(), user_id: user.id });
    }, []);

    return (
        <Card
            variant='outlined'
            sx={{ minWidth: 275, maxWidth: 600, mx: 'auto', px: 2, py: 1, my: 2}}
        >
            <CardContent>
                <Grid sx={{ mb: 3 }}>
                    <h2> Add a new crisis </h2>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <p> When was your last migraine </p>
                        <DateTimePicker 
                            label="Date & Time" 
                            format='YYYY-MM-DD'
                            onChange={(newValue : any) => setEvent({ ...event, date: dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ') })}/>
                    </Grid>
                    <Grid item xs={12}>
                        <p> How long did it last </p>
                        <Slider 
                                min={24}
                                step={24}
                                valueLabelDisplay="auto"
                                max={72}
                                onChange={(sliderEvent, value: any) =>  setEvent({ ...event, duration: value })}
                                marks={marks}
                        />       
                    </Grid>
                    <Grid item xs={12}>
                        <p> Evaluate your pain </p>
                        <Slider 
                                min={0}
                                step={1}
                                valueLabelDisplay="auto"
                                max={10}
                                onChange={(sliderEvent, value: any) =>  setEvent({ ...event, pain: value })}
                                marks={pains}
                        />   
                    </Grid>
                    <Grid item xs={12}>
                        <p> Symptoms </p>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                            {config.symptoms.map((x,y) => (
                               ((y < symptomsLength / 2) ?
                                <FormControlLabel
                                    key={y}
                                    label={x}
                                    control={
                                        <Checkbox 
                                            name={x}
                                            onChange={ ()=> handleChange(y, 'symptoms')}
                                        />
                                    }
                                /> : '') 
                            ))}
                             </Grid>
                             <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                            {config.symptoms.map((x,y) => (
                               ((y >= symptomsLength / 2) ?
                                <FormControlLabel
                                    key={y}
                                    label={x}
                                    control={
                                        <Checkbox 
                                            name={x}
                                            onChange={ ()=> handleChange(y, 'symptoms')}
                                        />
                                    }
                                /> : '') 
                            ))}
                             </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <p> Locations </p>
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                            {config.locations.map((x,y) => (
                               ((y < locationsLength / 2) ?
                                <FormControlLabel
                                    key={y}
                                    label={x}
                                    control={
                                        <Checkbox 
                                            name={x}
                                            onChange={ ()=> handleChange(y, 'locations')}
                                        />
                                    }
                                /> : '') 
                            ))}
                             </Grid>
                             <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                            {config.locations.map((x,y) => (
                               ((y >= locationsLength / 2) ?
                                <FormControlLabel
                                    key={y}
                                    label={x}
                                    control={
                                        <Checkbox 
                                            name={x}
                                            onChange={ ()=> handleChange(y, 'locations')}
                                        />
                                    }
                                /> : '') 
                            ))}
                             </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <p> Medications </p>
                            <Grid columns={2} container alignContent='flex-start' alignItems='flex-start' flexDirection='column'>
                                {config.medications.map((x,y) => (
                                    <FormControlLabel
                                        key={y}
                                        label={x}
                                        control={
                                            <Checkbox 
                                                name={x}
                                                onChange={ ()=> handleChange(y, 'medications')}
                                            />
                                        }
                                    />
                                ))}
                            </Grid>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            error
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Grid>
                        <Stack 
                               direction={{ xs: 'column', sm: 'row' }} 
                               spacing={2}>
                                <LoadingButton  
                                        variant='contained' 
                                        onClick={saveEvent} 
                                        loading={loading}
                                > 
                                    Submit 
                                </LoadingButton>
                                <Button
                                       variant='outlined' 
                                       color='error'
                                       onClick={() => setOpen(false)}
                                >
                                     Close 
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

}