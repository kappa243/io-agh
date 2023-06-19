'use client';

import { useCallback, useState } from "react";
import {sendMail} from "@/app/sendMail";

export default function BackendNaFroncie() {
  const [resp, setResp] = useState("none");

  const handleClick = useCallback(async () => {
    setResp("waiting...")
    let data = await sendMail("norbertzpilicy@gmail.com", "hello there");
    if (data !== "ok")
      setResp("failed: " + data)
    else
      setResp("ok")
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Send mail</button>
      <div>API response: {resp}</div>
    </div>
  );
}
