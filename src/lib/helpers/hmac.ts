import { createHmac } from 'crypto'
import { SECRET_KEY } from '$env/static/private'

const DEFAULT_SECRET_STRING = 'Fredekiko'

export function generateHmac(data: string | object): string {
  const secret = SECRET_KEY || DEFAULT_SECRET_STRING
  const message = typeof data === 'string' ? data : JSON.stringify(data)
  return createHmac('sha256', secret).update(message).digest('hex')
}

export function verifyHmac(data: string | object, hmacToVerify: string): boolean {
  const generatedHmac = generateHmac(data)
  return generatedHmac === hmacToVerify
}
