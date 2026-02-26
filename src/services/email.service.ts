import { getMailer, verifyTransport } from '../config/mailer.js'
import { renderTemplate, getAvailableTemplates } from '../templates/index.js'
import { emailConfig } from '../config/email-config.js'
import { logger } from '../utils/logger.js'
import { retry } from '../utils/retry.js'
import nodemailer from 'nodemailer'
import type { EmailOptions, SendTemplateOptions, EmailResponse } from '../types/email.js'

export class EmailService {
  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    const mailer = await getMailer() // Await here!
    
    const mailOptions = {
      from: options.from ? `${options.from.name || ''} <${options.from.email}>` : 
             `${emailConfig.defaultFrom.name} <${emailConfig.defaultFrom.email}>`,
      to: Array.isArray(options.to) ? options.to.join(',') : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      cc: options.cc?.join(','),
      bcc: options.bcc?.join(','),
      headers: options.headers,
      attachments: options.attachments
    }

    try {
      const startTime = Date.now()
      
      const result = await retry(
        () => mailer.sendMail(mailOptions),
        { maxRetries: 3, delayMs: 1000, backoffMultiplier: 2 }
      )

      const duration = Date.now() - startTime

      // Log email preview URL for Ethereal emails
      if (emailConfig.nodeEnv === 'development') {
        const previewUrl = nodemailer.getTestMessageUrl(result)
        if (previewUrl) {
          logger.info(`Email preview: ${previewUrl}`)
        }
      }

      logger.info('Email sent successfully', {
        messageId: result.messageId,
        to: options.to,
        subject: options.subject,
        duration
      })

      return {
        messageId: result.messageId,
        response: result.response,
        accepted: result.accepted,
        rejected: result.rejected,
        timestamp: new Date()
      }
    } catch (error) {
      logger.error('Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: error instanceof Error ? error.message : String(error)
      })
      throw error
    }
  }

  async sendTemplateEmail(options: SendTemplateOptions): Promise<EmailResponse> {
    const rendered = renderTemplate(options.templateName, options.data)
    
    if (!rendered) {
      throw new Error(`Template not found: ${options.templateName}`)
    }

    return this.sendEmail({
      to: options.to,
      subject: options.subject || rendered.subject,
      html: rendered.html,
      text: rendered.text,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc
    })
  }

  async sendWelcomeEmail(
    email: string,
    userName: string,
    activationLink?: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'welcome',
      data: {
        userName,
        activationLink
      }
    })
  }

  async sendPasswordResetEmail(
    email: string,
    resetLink: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'password-reset',
      data: { resetLink }
    })
  }

  async sendProjectMatchEmail(
    email: string,
    projectData: {
      title: string
      description: string
      budgetMin: number
      budgetMax: number
      currency: string
      deadline: string
      skills: string
      link: string
      hoursToApply: number
    },
    userName: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'project-match',
      data: {
        userName,
        projectTitle: projectData.title,
        projectDescription: projectData.description,
        projectBudgetMin: projectData.budgetMin,
        projectBudgetMax: projectData.budgetMax,
        projectCurrency: projectData.currency,
        projectDeadline: projectData.deadline,
        projectSkills: projectData.skills,
        projectLink: projectData.link,
        hoursToApply: projectData.hoursToApply
      }
    })
  }

  async sendProposalReceivedEmail(
    email: string,
    proposalData: {
      projectTitle: string
      proposerName: string
      proposalMessage: string
      proposalBudget: number
      projectCurrency: string
      proposalDuration: string
      proposerRating: number
      proposerReviews: number
      link: string
    }
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'proposal-received',
      data: {
        projectTitle: proposalData.projectTitle,
        proposerName: proposalData.proposerName,
        proposalMessage: proposalData.proposalMessage,
        proposalBudget: proposalData.proposalBudget,
        projectCurrency: proposalData.projectCurrency,
        proposalDuration: proposalData.proposalDuration,
        proposerRating: proposalData.proposerRating,
        proposerReviews: proposalData.proposerReviews,
        proposalLink: proposalData.link
      }
    })
  }

  async sendPaymentConfirmationEmail(
    email: string,
    paymentData: {
      userName: string
      transactionId: string
      amount: number
      currency: string
      description: string
      date: string
      dashboardLink: string
    }
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'payment-confirmation',
      data: {
        userName: paymentData.userName,
        transactionId: paymentData.transactionId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        description: paymentData.description,
        paymentDate: paymentData.date,
        dashboardLink: paymentData.dashboardLink
      }
    })
  }

  async verifyConnection(): Promise<boolean> {
    return verifyTransport()
  }

  getAvailableTemplates() {
    return getAvailableTemplates()
  }
}

export const emailService = new EmailService()