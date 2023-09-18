'use client';
import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SingleLink from './components/SingleLink';
import { deepPurple } from '@mui/material/colors';
import { LinearProgress } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

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

  const [open, setOpen] = useState(true);

  return (
    <>
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
        <Tooltip
          title="Check your Beacons page for broken links"
          arrow
          enterDelay={500}
          leaveDelay={200}
          open={open}
          onFocus={() => setOpen(false)}
        >
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            className="p-2"
          >
            <Typography className="font-bold ml-2">beacons.ai/</Typography>
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
              disabled={isLoading}
              // !important because it seems Inter resets button background color to transparent in layout.jsx, but dispabling doesn't fix it?
            >
              Go
            </Button>
          </Stack>
        </Tooltip>
      </Paper>
      <div className="flex flex-col gap-y-4 w-11/12">
        {/* Show loading state */}
        {isLoading && (
          // <div className="self-center">
          <Box sx={{ width: 300, alignSelf: 'center' }}>
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
              <SingleLink
                key={link.url}
                url={link.url}
                delay={link.delay}
                style={{ transitionDelay: `${link.delay}ms` }}
              />
            ))}
          </TransitionGroup>
        ) : (
          <p>No links found</p>
        )}

        {error && <div>There was an error: {error}</div>}
      </div>
    </>
  );
}
