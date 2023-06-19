'use client';

import { useCallback, useState } from "react";

export default function BackendNaFroncie() {
  const [resp, setResp] = useState("none");

  const handleClick = useCallback(async () => {
    const res = await fetch('/backend/na/froncie/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'xd',
      }),
    });
    const data = await res.json();
    setResp(JSON.stringify(data));
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Send mail</button>
      <div>API response: {resp}</div>
    </div>
  );
}
