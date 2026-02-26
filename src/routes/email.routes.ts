import express, { Router, Request, Response, NextFunction } from 'express'
import { emailService } from '../services/email.service.js'
import {
  validateRequest,
  emailSchema,
  templateEmailSchema,
  notificationEmailSchema
} from '../middleware/validation.js'
import { logger } from '../utils/logger.js'
import type { EmailOptions, SendTemplateOptions } from '../types/email.js'

const router = Router()

// Envoyer un email simple
router.post('/send', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = validateRequest(emailSchema, req.body)
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      })
    }

    const emailOptions = validation.value as unknown as EmailOptions
    const result = await emailService.sendEmail(emailOptions)

    res.json({
      success: true,
      messageId: result.messageId,
      timestamp: result.timestamp
    })
  } catch (error) {
    logger.error('Send email error', error)
    next(error)
  }
})

// Envoyer email avec template
router.post('/send-template', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = validateRequest(templateEmailSchema, req.body)
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      })
    }

    const templateOptions = validation.value as unknown as SendTemplateOptions
    const result = await emailService.sendTemplateEmail(templateOptions)

    res.json({
      success: true,
      messageId: result.messageId,
      timestamp: result.timestamp
    })
  } catch (error) {
    logger.error('Send template email error', error)
    next(error)
  }
})

// Obtenir les templates disponibles
router.get('/templates', (req: Request, res: Response) => {
  try {
    const templates = emailService.getAvailableTemplates()
    
    res.json({
      success: true,
      templates
    })
  } catch (error) {
    logger.error('Get templates error', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve templates'
    })
  }
})

// Vérifier la connexion SMTP
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const verified = await emailService.verifyConnection()
    
    res.json({
      success: true,
      verified,
      message: verified ? 'Email service is working correctly' : 'Failed to verify email service'
    })
  } catch (error) {
    logger.error('Verify connection error', error)
    res.status(500).json({
      success: false,
      error: 'Failed to verify email service'
    })
  }
})

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

export default router
