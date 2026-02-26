import pino from 'pino'
import { emailConfig } from '../config/email-config.js'

const isDev = process.env.NODE_ENV !== 'production'

const logger = pino(
  isDev
    ? {
        level: emailConfig.logLevel,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
      }
    : {
        level: emailConfig.logLevel
      }
)

export { logger }