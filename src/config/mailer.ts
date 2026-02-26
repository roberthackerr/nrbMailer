import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { emailConfig } from './email-config.js'
import { logger } from '../utils/logger.js'

let transporter: Transporter | null = null

export async function initMailer(): Promise<Transporter> {
  if (transporter) {
    return transporter
  }

  const env = emailConfig.nodeEnv

  // Gmail
  if (emailConfig.gmail.user && emailConfig.gmail.appPassword) {
    logger.info('Initializing Gmail transport')
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.gmail.user,
        pass: emailConfig.gmail.appPassword
      }
    })
    return transporter
  }

  // SMTP Custom
  if (emailConfig.smtp.host && emailConfig.smtp.user) {
    logger.info(`Initializing SMTP transport: ${emailConfig.smtp.host}`)
    transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.smtp.user,
        pass: emailConfig.smtp.password
      }
    })
    return transporter
  }

  // SendGrid via SMTP
  if (emailConfig.sendgrid.apiKey) {
    logger.info('Initializing SendGrid transport')
    transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: emailConfig.sendgrid.apiKey
      }
    })
    return transporter
  }

  // Fallback: Development (Ethereal)
  if (env === 'development') {
    logger.warn('No email config found, using Ethereal test account')
    transporter = await createTestTransport()
    return transporter
  }

  throw new Error('No email transport configured')
}

async function createTestTransport(): Promise<Transporter> {
  const testAccount = await nodemailer.createTestAccount()
  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })
  
  // Log test account credentials for debugging
  logger.info(`Test account created: ${testAccount.user}`)
  logger.info(`Test password: ${testAccount.pass}`)
  logger.info(`Web interface: https://ethereal.email/login`)
  
  return transport
}

export async function getMailer(): Promise<Transporter> {
  if (!transporter) {
    return await initMailer()
  }
  return transporter
}

export async function verifyTransport(): Promise<boolean> {
  try {
    const mailer = await getMailer()
    await mailer.verify()
    logger.info('Email transport verified successfully')
    return true
  } catch (error) {
    logger.error('Failed to verify email transport', error)
    return false
  }
}

// Utility to get test account info (for debugging)
export async function getTestAccountInfo() {
  if (emailConfig.nodeEnv === 'development' && transporter) {
    try {
      const testAccount = await nodemailer.createTestAccount()
      return {
        user: testAccount.user,
        pass: testAccount.pass,
        web: 'https://ethereal.email/login'
      }
    } catch (error) {
      logger.error('Failed to get test account info', error)
      return null
    }
  }
  return null
}