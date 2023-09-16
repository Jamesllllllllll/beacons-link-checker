'use client';
import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SingleLink from './components/SingleLink';
import { LinearProgress } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './Page.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkBeacons = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setLinks([]);
    try {
      const response = await fetch(`/api/checkBeacon?username=${username}`, {
        method: 'GET',
      });
      console.log(response);
      if (response.ok) {
        const { data } = await response.json();
        setLinks(data);
      } else {
        setError(response.statusText);
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.log(`There was an error: ${err}`);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const runCRON = () => {
    fetch('/api/weeklyCron');
  };

  return (
    <main className="flex min-h-screen justify-center py-4 sm:py-24 gap-12">
      <Paper
        variant="outlined"
        color="neutral"
        className="flex flex-col items-center justify-start rounded-3xl shadow-lg px-2 py-16 gap-8 bg-gradient-to-b from-gray-50 to-slate-50 w-11/12 sm:p-16 lg:w-3/4"
        sx={{ p: 4 }}
      >
        <Typography>Check your Beacons page for broken links</Typography>
        <Paper
          component="form"
          sx={{
            // p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="mx-4 sm:mx-0"
          onSubmit={checkBeacons}
        >
          <FormLabel className="sr-only">Enter your Beacons username</FormLabel>
          <Stack direction="row" alignItems="center"  width="100%" className="p-2">
            <Typography className="font-bold mx-0">beacons.ai/</Typography>
            <InputBase
              className="pl-[2px] mt-[1px]"
              placeholder="username"
              required
              size="medium"
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start" className="font-bold mx-px">

              //     </InputAdornment>
              //   ),
              // }}
              value={username}
              onChange={handleChange}
              onSubmit={checkBeacons}
            />
            <Button
              onClick={checkBeacons}
              variant="contained"
              size="medium"
              className="self-center"
              sx={{ backgroundColor: '#1565c0 !important' }}
              // !important because it seems Inter resets button background color to transparent in layout.jsx, but dispabling doesn't fix it?
            >
              Go
            </Button>
          </Stack>
        </Paper>
        <div className="flex flex-col gap-y-4 w-11/12">
          {/* Show loading state */}
          {isLoading && (
            // <div className="self-center">
            <Box sx={{ maxWidth: 300, alignSelf: 'center' }}>
              <LinearProgress />
            </Box>
            // </div>
          )}

          {/* Show title if links exist */}
          {links.length > 0 && links[0] !== 'No links found' && (
            <h2 className="text-xl font-semibold">Your Beacons Links:</h2>
          )}

          {/* Show links, otherwise show none found */}
          {links[0] !== 'No links found' ? (
            <TransitionGroup>
              {links.map((link) => (
                <CSSTransition key={link} timeout={500} classNames="item">
                  <SingleLink key={link} url={link} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <p>No links found</p>
          )}

          {error && <div>There was an error: {error}</div>}
          {process.env.NODE_ENV === 'development' && (
            <Button onClick={runCRON} variant="outlined">
              Run CRON Job
            </Button>
          )}
        </div>
      </Paper>
    </main>
  );
}
