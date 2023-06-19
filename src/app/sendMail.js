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
    console.error("email sending failed with: ", data.error)
    return data.error
  }

  return "ok"
}

let prefix = "http://localhost:3000"
let page = "client/order?orderId="

function linkTo(id) {
  return `<a href=${prefix}/${page}${id}>${id}</a>`
}

export async function mailUpdateStatus(to, id, status) {
  await sendMail(to, `Twoje zamówienie nr ${linkTo(id)} zmieniło status na: ${status}.`)
}

export async function mailCreateOrder(to, id) {
  await sendMail(to, `Na twój adres email zostało założone zlecenie nr ${linkTo(id)}.`)
}