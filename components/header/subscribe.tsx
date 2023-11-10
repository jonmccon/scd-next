'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const headers = {
      "Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`
    };

    const BASE_URL = "https://api.buttondown.email";
    const ENDPOINT = "/v1/subscribers";

    axios.post(`${BASE_URL}${ENDPOINT}`, { email }, { headers })
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
    <form onSubmit={handleSubmit}>
      <label>Enter your email</label>
      <input 
        type="email" 
        name="email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      
      <input type="submit" value="Subscribe" />
      {status === 'Subscription successful' && <p>Thank you for subscribing!</p>}
      {status === 'Subscription failed' && <p>Subscription failed. Please try again.</p>}
    </form>
  );
};

export default Subscribe;