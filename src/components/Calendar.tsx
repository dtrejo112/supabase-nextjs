"use client";
import dayjs from "dayjs";
import { Alert, AlertTitle, Button, Card, Grid, useTheme} from '@mui/material';
import CalendarHeatmap from "react-calendar-heatmap";
import 'react-calendar-heatmap/dist/styles.css';
import { Event } from "@/types";

type Props = {
    events: Event[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Calendar({ events, setOpen}: Props) {
    const theme = useTheme();
    let yearly = dayjs().subtract(365, 'days').format('YYYY-MM-DD');
    const formattedEvents = events.map((event) => ({
        ...event,
        date: dayjs(event.date).format('YYYY-MM-DD'),
    }));
    return (
        <Card variant='outlined' sx={{m: 4}}>
        <Grid item className="Calendar" sx={{ p: 4}}>
            <Grid
                direction='row'
                container
                justifyContent='space-between'
                alignItems='center'
                justifyItems='center'
                sx={{ mb: 4 }}
            >
                <h2> Migraine </h2>
                <Button
                    className="info"
                    variant='outlined'
                    onClick={()=> setOpen(true)}
                >
                    New
                </Button>
            </Grid>
            <CalendarHeatmap 
                  startDate={yearly} 
                  showWeekdayLabels 
                  values={formattedEvents} 
                  classForValue={(value) => {
                    if (!value) {
                        return "color-empty";
                    }
                    return `color-pain-${value.pain}`;
                  }}
            />
            <Alert severity="info">
                <AlertTitle> Beta </AlertTitle>
                <span>
                    In Beta
                </span>
            </Alert>
        </Grid>
        </Card>
    )
}