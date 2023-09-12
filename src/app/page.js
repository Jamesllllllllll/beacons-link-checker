'use client';
import React from 'react';
import { useState } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import SingleLink from './components/SingleLink';
import Loading from './components/Loading';
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
    <main className="flex min-h-screen justify-center min-height-screen py-24 gap-12">
      <Sheet
        variant="outlined"
        color="neutral"
        className="flex flex-col items-center justify-start px-2 py-16 gap-8 bg-gradient-to-b from-purple-50 to-indigo-50 w-11/12 sm:p-16 lg:w-3/4"
        sx={{ p: 4 }}
      >
        <form onSubmit={checkBeacons}>
          <FormLabel className="sr-only">Enter your Beacons username</FormLabel>
          <Input
            label="Your Beacons Username"
            placeholder="Your Beacons Username"
            variant="outlined"
            color="primary"
            sx={{
              '--Input-focusedInset': 'var(--any, )',
              '--Input-focusedThickness': '0.25rem',
              '--Input-focusedHighlight': 'rgba(13,110,253,.25)',
              '&::before': {
                transition: 'box-shadow .15s ease-in-out',
              },
              '&:focus-within': {
                borderColor: '#86b7fe',
              },
            }}
            value={username}
            onChange={handleChange}
            onSubmit={checkBeacons}
            endDecorator={
              <Button
                onClick={checkBeacons}
                variant="solid"
                sx={{
                  backgroundColor: '#185EA5 !important',
                  position: 'relative',
                }}
                className={styles.searchButton}
              >
                Go
              </Button>
            }
            // To-Do: Figure out why the background color is white without !important
          />
        </form>
        <div className="flex flex-col gap-y-4 w-11/12">
          {/* Show loading state */}
          {isLoading && (
            <div className="self-center">
              <Loading />
            </div>
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
      </Sheet>
    </main>
  );
}
