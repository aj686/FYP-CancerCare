import React from 'react';
import EventList from './EventLists';

export default function ActiveEventList({ events }) {
    return <EventList events={events} />;
}