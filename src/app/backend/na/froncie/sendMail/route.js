import { NextResponse } from "next/server";

import {SMTPClient} from 'smtp-client';

let HOST = "poczta.int.pl"
let PORT= 465
let SECURE = true
let LOGIN = "mechanicioioio@int.pl"
let PASSWORD = "wRtOnTHEw4a!!"

let s = new SMTPClient({
  host: HOST,
  port: PORT,
  secure: SECURE,
})

let FROM = 'mechanicioioio@int.pl'

export async function POST(request) {
  const { to, message } = await request.json();

  console.log(FROM)

  try {
    await s.connect();
    await s.greet({hostname: HOST});
    await s.authPlain({username: LOGIN, password: PASSWORD});
    await s.mail({from: FROM});
    await s.rcpt({to: to});

    let data = ""
    data += "Subject: [Mechanik] Aktualizacja twojego zlecenia\r\n"
    data += "\r\n"
    data += message
    await s.data(data);

    await s.quit();

    return NextResponse.json({ status: "ok", message });
  }
  catch (error) {
    return NextResponse.json({ status: "error", error });
  }
}
