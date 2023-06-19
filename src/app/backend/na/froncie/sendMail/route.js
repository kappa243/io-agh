import { NextResponse } from "next/server";

import {SMTPClient} from 'smtp-client';

let HOST = "poczta.int.pl"
let PORT= 465
let SECURE = true
let LOGIN = "mechanicioioio@int.pl"
let PASSWORD = "wRtOnTHEw4a!!"

let FROM = 'mechanicioioio@int.pl'

export async function POST(request) {
  const { to, message } = await request.json();

  console.log(FROM)
  let response;

  let s = new SMTPClient({
    host: HOST,
    port: PORT,
    secure: SECURE,
  })

  try {
    await s.connect(); console.log(); console.log("ok1")
    await s.greet({hostname: HOST}); console.log("ok2")
    await s.authPlain({username: LOGIN, password: PASSWORD}); console.log("ok3")
    await s.mail({from: FROM}); console.log("ok4")
    await s.rcpt({to: to}); console.log("ok5")

    let data = ""
    data += "Subject: [Mechanik] Aktualizacja twojego zlecenia\r\n"
    data += "Content-type: text/html\r\n"
    data += "\r\n"
    data += message
    await s.data(data);

    response = {status: "ok"}
  }
  catch (error) {
    response = { status: "error", error };
  }

  await s.quit();
  return NextResponse.json(response);
}
