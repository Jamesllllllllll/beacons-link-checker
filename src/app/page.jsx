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
import LoadingMessage from './components/LoadingMessage';

export default function Home() {
  const [username, setUsername] = useState('');
  const { links, setLinks, welcome, setWelcome } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const [open, setOpen] = useState(true);
  const inputRef = useRef();

  const messages = [
    'Thanks for trying our tool!',
    'This will take 10-20 seconds...',
    "A 'Headless' browser is loading up your profile",
    'It will scan the page for your links, then we will check each one',
    'If there are any broken links, you will see their status and can check for yourself!',
    'Any second now..!',
  ];

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
            <Fade in={welcome} out={!welcome} timeout={1000}>
              <Alert
                severity="info"
                sx={{ mx: 'auto', my: 4, backgroundColor: '#d5fffe' }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  What is this for?
                </Typography>
                <Typography>
                  Check for broken links on your <em>Link in Bio</em> page so
                  your fans always have access to your content.
                </Typography>
              </Alert>
            </Fade>
            <Fade in={welcome} out={!welcome} timeout={2000}>
              <Typography>
                Don&apos;t have a Beacons Account? Try out the tool with one of
                these usernames:
              </Typography>
            </Fade>
            <Fade in={welcome} out={!welcome} timeout={3000}>
              <Stack direction="row" gap={4} flexWrap="wrap">
                <Button
                  variant="outlined"
                  onClick={() => setUsername('duckytheyorkie')}
                >
                  duckytheyorkie
                </Button>
                <Button variant="outlined" onClick={() => setUsername('james')}>
                  james
                </Button>
              </Stack>
            </Fade>
          </>
        )}

        {isLoading && (
          <Box sx={{ width: 300, alignSelf: 'center' }}>
            <LinearProgress />
            <LoadingMessage messages={messages} />
          </Box>
        )}

        {links[0] === 'No account associated with this username' && (
          <p>No account associated with this username</p>
        )}

        {/* Show heading if links exist */}
        {links.length > 0 &&
          links[0] !== 'No links found' &&
          links[0] !== 'No account associated with this username' && (
            <Stack
              direction="row"
              justifyContent="space-between"
              className="w-full"
            >
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

        {/* Show links */}
        {links[0] !== 'No account associated with this username' && (
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
        )}

        {/* If user is found but no links exist */}
        {links[0] === 'No links found' && <p>No links found</p>}

        {error && <div>There was an error: {error}</div>}
      </div>
    </>
  );
}
