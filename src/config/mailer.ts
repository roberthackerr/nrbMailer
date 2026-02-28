// mailer.ts
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { emailConfig } from './email-config.js';
import { logger } from '../utils/logger.js';

let transporter: any = null;

export async function initMailer(): Promise<any> {
  if (transporter) {
    return transporter;
  }

  const env = emailConfig.nodeEnv;

  // Gmail with OAuth2 (preferred for production)
  if (emailConfig.gmail.clientId && emailConfig.gmail.clientSecret && emailConfig.gmail.refreshToken) {
    logger.info('Initializing Gmail OAuth2 transport');
    
    const oauth2Client = new google.auth.OAuth2(
      emailConfig.gmail.clientId,
      emailConfig.gmail.clientSecret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ 
      refresh_token: emailConfig.gmail.refreshToken 
    });

    try {
      const accessToken = await oauth2Client.getAccessToken();
      
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: emailConfig.gmail.user,
          clientId: emailConfig.gmail.clientId,
          clientSecret: emailConfig.gmail.clientSecret,
          refreshToken: emailConfig.gmail.refreshToken,
          accessToken: accessToken.token,
        },
      });
      
      return transporter;
    } catch (error) {
      logger.error('Failed to initialize Gmail OAuth2', error);
    }
  }

  // Gmail with App Password (fallback)
  if (emailConfig.gmail.user && emailConfig.gmail.appPassword) {
    logger.info('Initializing Gmail App Password transport');
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.gmail.user,
        pass: emailConfig.gmail.appPassword
      }
    });
    return transporter;
  }

  // SMTP Custom
  if (emailConfig.smtp.host && emailConfig.smtp.user) {
    logger.info(`Initializing SMTP transport: ${emailConfig.smtp.host}`);
    transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      logger: true,
      debug: true,
      requireTLS: true,
      auth: {
        user: emailConfig.smtp.user,
        pass: emailConfig.smtp.password
      }
    });
    return transporter;
  }

  // SendGrid via SMTP
  if (emailConfig.sendgrid?.apiKey) {
    logger.info('Initializing SendGrid transport');
    transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: emailConfig.sendgrid.apiKey
      }
    });
    return transporter;
  }

  // Fallback: Development (Ethereal)
  if (env === 'development') {
    logger.warn('No email config found, using Ethereal test account');
    transporter = await createTestTransport();
    return transporter;
  }

  throw new Error('No email transport configured');
}

async function createTestTransport(): Promise<any> {
  const testAccount = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  
  logger.info(`Test account created: ${testAccount.user}`);
  logger.info(`Web interface: https://ethereal.email/login`);
  
  return transport;
}

export async function getMailer(): Promise<any> {
  if (!transporter) {
    return await initMailer();
  }
  return transporter;
}

export async function verifyTransport(): Promise<boolean> {
  try {
    const mailer = await getMailer();
    await mailer.verify();
    logger.info('Email transport verified successfully');
    return true;
  } catch (error) {
    logger.error('Failed to verify email transport', error);
    return false;
  }
}

export async function getTestAccountInfo(): Promise<any> {
  if (emailConfig.nodeEnv === 'development' && transporter) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      return {
        user: testAccount.user,
        pass: testAccount.pass,
        web: 'https://ethereal.email/login'
      };
    } catch (error) {
      logger.error('Failed to get test account info', error);
      return null;
    }
  }
  return null;
}