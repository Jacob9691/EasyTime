// Imports til React, useState og useEffect
import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views, CalendarProps } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';  // Bruger context fra ContextProvider

// Lokalisering af kalender med moment.js
const localizer = momentLocalizer(moment);

// Interface til begivenhedsobjekter
interface Event {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    user_id: string;
}

// Kalenderkomponent som en funktionskomponent
// lige nu er der en fejl, så events ikke kan blive set under week og day format
const Calendar: React.FC<CalendarProps<Event>> = () => {
    const { user } = useStateContext();  // Bruger tilstand fra context
    const [events, setEvents] = useState<Event[]>([]);  // Tilstand til at gemme begivenheder

    // Effekt til at hente begivenheder ved komponentens indlæsning
    useEffect(() => {
        fetchEvents();  // Funktion til at hente begivenheder
    }, []);

    // Funktion til at hente begivenheder fra serveren
    const fetchEvents = () => {
        axiosClient.get('/events')
            .then(response => {
                setEvents(response.data);  // Opdaterer tilstanden med hentede begivenheder
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    };

    // Funktion til at håndtere oprettelse af ny begivenhed
    const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
        const title = window.prompt('New Event name');  // Prompt til at indtaste navn på ny begivenhed
        if (title && user?.id) {
            const newEvent: Event = { start, end, title, user_id: user.id };

            axiosClient.post('/events', newEvent)
                .then(response => {
                    setEvents(prevEvents => [...prevEvents, response.data]);  // Tilføjer den nye begivenhed til tilstanden
                })
                .catch(error => {
                    console.error('Error adding new event:', error);
                });
        }
    };

    // Funktion til at håndtere klik på en begivenhed for sletning
    const handleEventClick = (event: Event) => {
        const confirmDelete = window.confirm(`Do you want to delete the event "${event.title}"?`);  // Bekræftelse af sletning
        if (confirmDelete) {
            axiosClient.delete(`/events/${event.id}`)
                .then(() => {
                    setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));  // Opdaterer tilstanden ved at filtrere den slettede begivenhed
                })
                .catch(error => {
                    console.error('Error deleting event:', error);
                });
        }
    };

    // Returnerer kalenderkomponenten med visning af begivenheder
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Calendar</h1>  {/* Overskrift til kalenderen */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BigCalendar
                    selectable
                    localizer={localizer}
                    events={events}
                    defaultView={Views.MONTH}  /* Standardvisning af kalenderen */
                    defaultDate={new Date()}  /* Standarddato for kalenderen */
                    style={{ height: 600 }}  /* Stil til kalenderhøjde */
                    onSelectSlot={handleSelect}  /* Håndterer valg af tidsperiode */
                    onSelectEvent={handleEventClick}  /* Håndterer klik på begivenhed */
                />
            </div>
        </div>
    );
};

export default Calendar;  // Eksporterer kalenderkomponenten som standard
