import pino from 'pino'
import { emailConfig } from '../config/email-config.js'

// Try to use pino-pretty when available (dev). If not installed, fallback to plain pino.
// Using dynamic import with top-level await so this file works in ESM environments.
let pinoOptions: any = { level: emailConfig.logLevel }

try {
  // Try to load pino-pretty; if it's missing this will throw and we'll fallback.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await import('pino-pretty')

  pinoOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
} catch (err) {
  // pino-pretty not available — use default pino output (JSON) which is safe.
}

export const logger = pino(pinoOptions)
