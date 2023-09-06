'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SingleLink.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function SingleLink({ url }) {
  const [status, setStatus] = useState('Checking Link-purple');
  const Badge = () => {
    let message;
    switch (status) {
      case 200:
        message = 'OK!-green';
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
      <div style={{ position: 'relative', width: '100%' }}>
        <Image
          src={`https://img.shields.io/badge/Status: ${status}-${message}`}
          className={styles.badge}
          alt={status}
          layout="fill"
          objectFit="contain"
        />
      </div>
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

  const trimmedUrl = url.replace(/(^\w+:|^)\/\//, '');
  return (
    <div
      class="flex flex-row justify-between items-center flex-wrap gap-8 my-4"
      key={url}
    >
      <Link href={url} key={trimmedUrl}>
        {trimmedUrl}
      </Link>
      {status === 'Checking Link-purple' ? (
        <div style={{ position: 'relative', width: '100%' }}>
          <Image
            className={styles.badge}
            // eslint-disable-next-line quotes
            src={`https://img.shields.io/badge/Status: - Checking Link-purple`}
            alt={status}
            layout="fill"
            objectFit="contain"
          />
        </div>
      ) : (
        <Badge />
      )}
    </div>
  );
}
