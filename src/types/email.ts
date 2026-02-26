export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: {
    name?: string
    email: string
  }
  replyTo?: string
  cc?: string[]
  bcc?: string[]
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
  headers?: Record<string, string>
}

export interface SendTemplateOptions {
  to: string | string[]
  templateName: string
  data: Record<string, any>
  subject?: string
  replyTo?: string
  cc?: string[]
  bcc?: string[]
}

export interface EmailResponse {
  messageId: string
  response: string
  accepted?: string[]
  rejected?: string[]
  timestamp: Date
}

export interface EmailNotificationData {
  userId: string
  type: EmailNotificationType
  data: Record<string, any>
}

export type EmailNotificationType =
  | 'proposal_received'
  | 'project_match'
  | 'payment_confirmation'
  | 'message_received'
  | 'profile_viewed'
  | 'contract_signed'
  | 'milestone_completed'
  | 'review_received'
