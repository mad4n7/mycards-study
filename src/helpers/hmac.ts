import { createHmac } from 'crypto'

const DEFAULT_SECRET_STRING = 'Fredekiko'
const secret =
  process.env.ENVIRONMENT === 'development'
    ? DEFAULT_SECRET_STRING
    : process.env.SECRET_KEY ?? DEFAULT_SECRET_STRING

function generateHmac(data: string | object): string {
  const message: string = data as string
  return createHmac('sha256', secret).update(message).digest('hex')
}

function verifyHmac(data: string | object, hmacToVerify: string): boolean {
  const generatedHmac = generateHmac(data)
  return generatedHmac === hmacToVerify
}

export { generateHmac, verifyHmac }
