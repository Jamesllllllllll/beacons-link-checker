/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import { Transition } from 'react-transition-group';

export default function SingleLink({ url, delay, in: inProp }) {
  const [status, setStatus] = useState('Checking Link-purple');
  const nodeRef = useRef(null);
  const Badge = () => {
    let message;
    switch (status) {
      case 200:
        message = 'OK!-green';
        break;
      case 400:
        message = 'Bad request-red';
        break;
      case 404:
        message = 'Not Found-red';
        break;
      case 403:
        message = 'Forbidden-red';
        break;
      case 500:
        message = 'Server Error-red';
        break;
      case 502:
        message = 'Bad Gateway-red';
        break;
      case 503:
        message = 'Service Unavailable-red';
        break;
      case 504:
        message = 'Timed Out-red';
        break;
      default:
        message = 'Checking Link-purple';
    }
    return (
      <img
        src={`https://img.shields.io/badge/${status}-${message}`}
        className="h-[20px] justify-self-end"
        alt={status}
      />
    );
  };
  const checkLink = async (url) => {
    try {
      const response = await fetch(`/api/checkHeader?url=${url}`);
      if (response.ok) {
        const { data } = await response.json();
        setStatus(data);
      }
    } catch (error) {
      console.log(`There was an error: ${error}`);
    }
  };

  useEffect(() => {
    checkLink(url);
  }, [url]);

  const trimURLstart = url.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, '');
  let trimURLend = trimURLstart.search(/\/\d{3,}/g);
  const trimmedURL =
    trimURLend !== -1
      ? trimURLstart.slice(0, trimURLend).concat('...')
      : trimURLstart;

  const defaultStyle = {
    transition: `opacity 500ms ease-in-out`,
    opacity: 0,
    transitionDelay: `${delay}ms`,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      nodeRef={nodeRef}
      key={url}
      timeout={{ enter: delay }}
      in={inProp}
      unmountOnExit={true}
    >
      {(state) => (
        <Card
          ref={nodeRef}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
          className="flex flex-row justify-between mb-10 p-8"
          key={url}
          role="listitem"
        >
          <Link
            href={url}
            key={trimmedURL}
            rel="nofollow noopener"
            className="break-all text-sm pr-6"
          >
            {trimmedURL}
          </Link>
          {status === 'Checking Link-purple' ? (
            <img
              className="h-[20px] justify-self-end"
              // eslint-disable-next-line quotes
              src={`https://img.shields.io/badge/Status: - Checking Link-purple`}
              alt={status}
              aria-hidden="true"
            />
          ) : (
            <Badge className="h-[20px] justify-self-end" />
          )}
        </Card>
      )}
    </Transition>
  );
}
