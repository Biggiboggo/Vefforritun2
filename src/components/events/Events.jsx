import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export function Events() {
    const [events, setEvents] = useState( [] );

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://vef2-20222-v3-synilausn.herokuapp.com/events'
        }).then(res => {
            setEvents(res.data.items)
        }); 
    });
    return (
        <section>
            <h2>Viðburðir á næstunni</h2>
            
            <div>
            {events.map((event, i) => (
                <div key={i}>
                    <ul >
                        <li>
                            <Link to={ '/' + event.id }>{event.name}</Link>
                            <p>{event.description}</p>
                        </li>
                    </ul>
                </div>
            ))}
            </div>
        </section>
    )
} 