'use client'
import React from 'react';
import { useState } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function Home() {
  const [username, setUsername] = useState('');
  const [links, setLinks] = useState(['link 1', 'link 2']);
  const [isLoading, setIsLoading] = useState(false);

  const checkBeacons = async (e) => {
    e.preventDefault();
    console.log('submitting...');
    setIsLoading(true);
    try {
      const response = await fetch(`/api/checkBeacon?username=${username}`, {
        method: 'GET',
      });
      console.log(response);
      const data = await response.json();
      setLinks(data);
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={checkBeacons}>
          <FormLabel className="sr-only">Enter your Beacons username</FormLabel>
          <Input
            placeholder="Your Beacons Username"
            variant="outlined"
            color="primary"
            sx={{
              '&::before': {
                display: 'none',
              },
              '&:focus-within': {
                outline: '0px',
                outlineOffset: '0px',
              },
            }}
            value={username}
            onChange={handleChange}
            onSubmit={checkBeacons}
            endDecorator={
              <Button
                onClick={checkBeacons}
                variant="solid"
                sx={{ backgroundColor: '#185EA5 !important' }}
              >
                Go
              </Button>
            }
            // To-Do: Figure out why the background color is white without !important
          />
        </form>
      </div>
      <div>
        {links.map((link) => (
          <div key={link}>{link}</div>
        ))}
      </div>
    </main>
  );
}
