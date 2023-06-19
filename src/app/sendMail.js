export async function sendMail(to, message) {
  const res = await fetch('/backend/na/froncie/sendMail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      to: to,
    }),
  });
  const data = await res.json();
  if (data.status !== "ok") {
    console.error("email sending failed with: ", data.message)
    return data.message
  }

  return "ok"
}