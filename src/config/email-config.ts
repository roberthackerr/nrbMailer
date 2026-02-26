import dotenv from 'dotenv'

dotenv.config()

export const emailConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
  
  // Email defaults
  defaultFrom: {
    email: process.env.DEFAULT_FROM_EMAIL || 'noreply@nrbtalents.com',
    name: process.env.DEFAULT_FROM_NAME || 'NrbTalents'
  },
  
  // SMTP
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: 'false',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || ''
  },
  
  // Gmail
  gmail: {
    user: process.env.GMAIL_USER || '',
    appPassword: process.env.GMAIL_APP_PASSWORD || ''
  },
  
  // SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || ''
  },
  
  // AWS SES
  awsSes: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_SES_REGION || 'eu-west-1'
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  },
  
  // Redis/Queue
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  
  // Database
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/nrbtalents'
  },
  
  // Templates
  templatesPath: process.env.TEMPLATES_PATH || './src/templates'
}
