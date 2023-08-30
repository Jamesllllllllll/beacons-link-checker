'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SingleLink({ url }) {
  const [status, setStatus] = useState(null);
  console.log(`URL in SingleLink component: ${url}`);
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

  return (
    <div key={url}>
      <Link href={url} key={url}>
        {url} {status && '- Status: ' + status}
      </Link>
    </div>
  );
}
