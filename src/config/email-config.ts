// email-config.ts
import dotenv from 'dotenv';
dotenv.config();

export const emailConfig = {
    port: parseInt(process.env.PORT || '3001', 10),
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),

  nodeEnv: process.env.NODE_ENV || 'development',
    defaultFrom: {
    email: process.env.DEFAULT_FROM_EMAIL || 'noreply@nrbtalents.com',
    name: process.env.DEFAULT_FROM_NAME || 'NrbTalents'
  },
  // Gmail OAuth2 Configuration
  gmail: {
    user: process.env.GMAIL_USER,
    appPassword: process.env.GMAIL_APP_PASSWORD,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN
  },
  
  // SMTP Configuration
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  },
  
  // SendGrid Configuration
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY
  }
};
// import dotenv from 'dotenv'

// dotenv.config()

// export const emailConfig = {
//   port: parseInt(process.env.PORT || '3001', 10),
//   nodeEnv: process.env.NODE_ENV || 'development',
//   corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  
//   // Email defaults
//   defaultFrom: {
//     email: process.env.DEFAULT_FROM_EMAIL || 'noreply@nrbtalents.com',
//     name: process.env.DEFAULT_FROM_NAME || 'NrbTalents'
//   },
  
//   // SMTP
//   smtp: {
//     host: process.env.SMTP_HOST || 'smtp.gmail.com',
//     port: parseInt(process.env.SMTP_PORT || '587', 10),
//     secure: 'false',
//     user: process.env.SMTP_USER || '',
//     password: process.env.SMTP_PASSWORD || ''
//   },
  
//   // Gmail
//   gmail: {
//     user: process.env.GMAIL_USER || '',
//     appPassword: process.env.GMAIL_APP_PASSWORD || ''
//   },
  
//   // SendGrid
//   sendgrid: {
//     apiKey: process.env.SENDGRID_API_KEY || ''
//   },
  
//   // AWS SES
//   awsSes: {
//     accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || '',
//     secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || '',
//     region: process.env.AWS_SES_REGION || 'eu-west-1'
//   },
  
//   // Logging
//   logLevel: process.env.LOG_LEVEL || 'info',
  
//   // Rate limiting
//   rateLimit: {
//     windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
//     maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
//   },
  
//   // Redis/Queue
//   redis: {
//     url: process.env.REDIS_URL || 'redis://localhost:6379'
//   },
  
//   // Database
//   database: {
//     url: process.env.DATABASE_URL || 'mongodb://localhost:27017/nrbtalents'
//   },
  
//   // Templates
//   templatesPath: process.env.TEMPLATES_PATH || './src/templates'
// }
