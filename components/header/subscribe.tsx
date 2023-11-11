'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  
 

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();    
    const headers = {
      "Authorization": `Token ${process.env.NEXT_PUBLIC_BUTTONDOWN_API_KEY}`
    };

    const BASE_URL = "https://api.buttondown.email";
    const ENDPOINT = "/v1/subscribers";

    axios.post(`${BASE_URL}${ENDPOINT}`, { email,  tags:["embeddedNext"]  }, { headers })
      .then(response => {
        console.log(response.data);
        setStatus('Subscription successful');
      })
      .catch(error => {
        console.error(error);
        setStatus('Subscription failed');
      });
  };

  return (
    <div className='headline-menu-right'>
      <form className='email-form' onSubmit={handleSubmit}>
        <label className=''>Newsletter</label>
        <input 
          type="email" 
          name="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        
        <button type="submit" value="Subscribe">Subscribe</button>
        {status === 'Subscription successful' && <p>Subscribed!</p>}
        {status === 'Subscription failed' && <p>Please try that again!</p>}
      </form>
    </div>
  );
};

export default Subscribe;