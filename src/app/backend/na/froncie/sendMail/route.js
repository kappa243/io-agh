import { NextResponse } from "next/server";

export async function POST(request) {
  const { message } = await request.json();
  // TODO: send mail
  return NextResponse.json({ status: "ok", message });
}
