import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Form } from '../form/Form';
import { Button } from '../button/Button';

export function Event({li}) {
    const [register, setRegister] = useState( [] );
    const [event, setEvent] = useState( [] );
    const [registrations, setRegistrations] = useState( [] );
    const { id } = useParams();
    var registered = true;
    useEffect(() => {
        console.log("a");
        setRegister(false);
        axios({
            method: 'GET',
            url: `https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}`
        }).then(res => {
            setEvent(res.data)
            setRegistrations(res.data.registrations)
        }); 
    }, [id]);
    if(registrations.length === 0) {
        registered = false;
    }
    if(registered) {
        return (
            
            <section>
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.description}</p> 
                </div>
                <div>
                    <h2>Skráningar á viðburð</h2>
                    {registrations.map((reg, i) => (
                        <div key={i}>
                            <ul>
                                <li>
                                    <span>
                                        {reg.name}
                                    </span>
                                    <span>
                                        {reg.comment}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
                <div>
                    {!register ? (
                        <div>
                            {li ? (
                            <div>
                                <h2>Skráðu þig</h2>
                                <Form num1='Nafn*' num2='Athugasemd'/>
                                <Button onClick={(e) => { setRegister(true) }} text='Skrá mig'/>
                            </div>
                            ) : (
                            <div>
                                <p>Skráðu þig inn til að skrá á viðburð</p>
                            </div>
                            )} 
                        </div>
                    ) : (
                        <div>
                            <p>Þú hefur skráð þig á viðburð</p>
                        </div>
                    )}
                </div> 
                <div>
                    <Link to='/'>Til baka</Link>
                </div> 
            </section>
        )
    }
    else {
        return (
            <section>
                <div>
                    <h1>{event.name}</h1>
                    <p>{event.description}</p> 
                </div>
                <div>
                    <h2>Skráningar á viðburð</h2>
                    <p>Enginn hefur skráð sig á þennan viðburð</p>
                </div>
                <div>
                    {!register ? (
                        <div>
                            {li ? (
                            <div>
                                <h2>Skráðu þig</h2>
                                <Form num1='Nafn*' num2='Athugasemd'/>
                                <Button onClick={(e) => { setRegister(true) }} text='Skrá mig'/>
                            </div>
                            ) : (
                            <div>
                                <p>Skráðu þig inn til að skrá á viðburð</p>
                            </div>
                            )} 
                        </div>
                    ) : (
                        <div>
                            <p>Þú hefur skráð þig á viðburð</p>
                        </div>
                    )}
                </div>
                <div>
                <Link to='/'>Til baka</Link>
                </div> 
            </section>
        )
    } 
}