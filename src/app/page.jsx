'use client';
import React, { useState, useContext, useRef, useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import SingleLink from './components/SingleLink';
import { LinearProgress } from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { AppContext } from './context/AppContext';

export default function Home() {
  const [username, setUsername] = useState('');
  const { links, setLinks } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcome(true);
    }, 1000);
  }, []);

  const checkBeacons = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setLinks([]);
    setWelcome(false);
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
  const inputRef = useRef();

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
              inputRef={inputRef}
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
            >
              Go
            </Button>
          </Stack>
        </Tooltip>
      </Paper>
      <div className="flex flex-col items-center gap-y-4 w-11/12">
        {welcome && (
          <>
            <Fade in={welcome} out={!welcome}>
              <Alert severity="info" sx={{ mx: 'auto', my: 4 , backgroundColor: '#d5fffe' }}>
                <Typography sx={{ fontWeight: 700 }}>
                  What is this for?
                </Typography>
                <Typography>
                  Check for broken links on your <em>Link in Bio</em> page so
                  your fans always have access to your content.
                </Typography>
              </Alert>
            </Fade>
            <Typography>
              Don&apos;t have a Beacons Account? Try out the tool with one of
              these usernames:
            </Typography>
            <Stack direction="row" gap={4} flexWrap="wrap">
              <Button
                variant="outlined"
                onClick={() => setUsername('duckytheyorkie')}
              >
                duckytheyorkie
              </Button>
              <Button variant="outlined" onClick={() => setUsername('michael')}>
                michael
              </Button>
              <Button
                variant="outlined"
                onClick={() => setUsername('techwithandrea')}
              >
                techwithandrea
              </Button>
            </Stack>
          </>
        )}

        {isLoading && (
          <Box sx={{ width: 300, alignSelf: 'center' }}>
            <LinearProgress />
          </Box>
        )}

        {/* Show heading if links exist */}
        {links.length > 0 && links[0] !== 'No links found' && (
          <Stack direction="row" justifyContent="space-between" className="w-full">
            <h2 className="text-xl font-semibold m-0">Your Beacons Links:</h2>
            <Button
              onClick={() => {
                setLinks([]);
                setUsername('');
                inputRef.current.focus();
              }}
              variant="outlined"
              size="small"
            >
              Clear
            </Button>
          </Stack>
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
