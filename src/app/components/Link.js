'use client'
import { useEffect, useState } from "react";

export default function Link({ url }) {
  const [status, setStatus] = useState(null);
  const checkLink = async (url) => {
    const status = await fetch(`/api/checkLink?url=${url}`);
    console.log(status);
    setStatus(status);
  };

  useEffect(() => {
    checkLink(url);
  }, [url]);

  return <div key={url}><Link href={url} key={url}>{url} - Status: </Link></div>
}