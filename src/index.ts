import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import emailRoutes from './routes/email.routes.js'
import { emailConfig } from './config/email-config.js'
import { initMailer, verifyTransport } from './config/mailer'
import { logger } from './utils/logger.js'

const app: Application = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: emailConfig.corsOrigin,
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/email', emailRoutes)

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'NrbTalents Email Service',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      send: 'POST /api/email/send',
      sendTemplate: 'POST /api/email/send-template',
      templates: 'GET /api/email/templates',
      verify: 'POST /api/email/verify',
      health: 'GET /api/email/health'
    }
  })
})

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  })
})

// Error handler
app.use((err: any, req: Request, res: Response) => {
  logger.error('Unhandled error', err)
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(emailConfig.nodeEnv === 'development' && { stack: err.stack })
  })
})

// Initialize and start server
async function start() {
  try {
    // Initialize mailer
    initMailer()
    const verified = await verifyTransport()
    
    if (!verified) {
      logger.warn('Email transport could not be verified, but server will continue')
    }

    app.listen(emailConfig.port, () => {
      logger.info(`🚀 Email service running on port ${emailConfig.port}`)
      logger.info(`Environment: ${emailConfig.nodeEnv}`)
      logger.info(`API documentation at http://localhost:${emailConfig.port}/`)
    })
  } catch (error) {
    logger.error('Failed to start server', error)
    process.exit(1)
  }
}

start()

export default app
