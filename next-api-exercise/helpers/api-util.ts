export async function newsletterResgistration(email: string) {
  return validateEmail(email)
}

async function validateEmail(email: string) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}