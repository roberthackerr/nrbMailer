import Joi from 'joi'
import { logger } from '../utils/logger.js'

// Schémas de validation
export const emailSchema = Joi.object({
  to: Joi.alternatives().try(
    Joi.string().email().required(),
    Joi.array().items(Joi.string().email()).min(1).required()
  ),
  subject: Joi.string().required().max(100),
  html: Joi.string().required(),
  text: Joi.string().optional(),
  replyTo: Joi.string().email().optional(),
  cc: Joi.array().items(Joi.string().email()).optional(),
  bcc: Joi.array().items(Joi.string().email()).optional(),
  from: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().required()
  }).optional()
})

export const templateEmailSchema = Joi.object({
  to: Joi.alternatives().try(
    Joi.string().email().required(),
    Joi.array().items(Joi.string().email()).min(1).required()
  ),
  templateName: Joi.string().required(),
  data: Joi.object().required(),
  subject: Joi.string().optional().max(100),
  replyTo: Joi.string().email().optional(),
  cc: Joi.array().items(Joi.string().email()).optional(),
  bcc: Joi.array().items(Joi.string().email()).optional()
})

export const notificationEmailSchema = Joi.object({
  userId: Joi.string().required(),
  type: Joi.string().valid(
    'proposal_received',
    'project_match',
    'payment_confirmation',
    'message_received',
    'profile_viewed',
    'contract_signed',
    'milestone_completed',
    'review_received'
  ).required(),
  data: Joi.object().required()
})

export interface ValidationError {
  field: string
  message: string
}

export function validateRequest<T>(
  schema: Joi.Schema,
  data: T
): { valid: boolean; errors?: ValidationError[]; value?: T } {
  try {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    })

    if (error) {
      const errors: ValidationError[] = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      
      logger.warn('Validation failed', { errors })
      return { valid: false, errors }
    }

    return { valid: true, value }
  } catch (err) {
    logger.error('Validation error', err)
    return {
      valid: false,
      errors: [{ field: 'unknown', message: 'Validation error' }]
    }
  }
}
