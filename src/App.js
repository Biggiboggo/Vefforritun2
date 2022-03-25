import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Events } from './components/events/Events';
import { Event } from './components/event/Event';
import { LoginPage } from './components/login/LoginPage';
import { Layout } from './components/layout/Layout';
import { Login } from './components/login/Login';
import { Button } from './components/button/Button';


const App = ()  => {
  const [loggedIn, setLoggedIn] = useState( [] );

  useEffect(() => {
    setLoggedIn(false); 
    console.log("adadadada");
  }, []);

  return (
    
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout title='Viðburðir' main={<Events />}/>}/>
          <Route path="/login" element={<Layout title='Innskráning' main={<LoginPage />}/>}/>
          <Route path="/:id" element={<Layout title='Viðburður' main={<Event li={loggedIn} />}/>}/>
        </Routes>
        <div>
          <Login li={loggedIn}/>
        </div>
        <div>
          {loggedIn ? (
            <Button onClick={(e) => { setLoggedIn(false) }} text='Útskrá'/>
          ) : (
            <Button onClick={(e) => { setLoggedIn(true) }} text='Nýskráning'/>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
