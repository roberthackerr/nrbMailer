import { getMailer, verifyTransport } from '../config/mailer';
import { renderTemplate, getAvailableTemplates } from '../templates/index';
import { emailConfig } from '../config/email-config';
import { logger } from '../utils/logger';
import { retry } from '../utils/retry';
import nodemailer from 'nodemailer';
import type { EmailOptions, SendTemplateOptions, EmailResponse } from '../types/email';

export class EmailService {
  async sendEmail(options: EmailOptions): Promise<EmailResponse> {
    try {
      const mailer = await getMailer();
      
      // Format sender
      const from = options.from 
        ? this.formatEmailAddress(options.from.name, options.from.email)
        : this.formatEmailAddress(emailConfig.defaultFrom.name, emailConfig.defaultFrom.email);

      // Format recipients
      const to = this.formatRecipients(options.to);
      const cc = options.cc ? this.formatRecipients(options.cc) : undefined;
      const bcc = options.bcc ? this.formatRecipients(options.bcc) : undefined;

      const mailOptions = {
        from,
        to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
        cc,
        bcc,
        headers: {
          'X-Priority': options.priority || 'normal',
          ...options.headers
        },
        attachments: options.attachments
      };

      const startTime = Date.now();

      // Send with retry
      const result: any = await retry(
        () => mailer.sendMail(mailOptions),
        { 
          maxRetries: 3, 
          delayMs: 1000, 
          backoffMultiplier: 2,
          retryIf: (error) => {
            const msg = error.message || '';
            return msg.includes('ETIMEDOUT') || 
                   msg.includes('ECONNREFUSED') ||
                   msg.includes('socket hang up');
          }
        }
      );

      const duration = Date.now() - startTime;

      // Log email preview URL for Ethereal (dev)
      if (emailConfig.nodeEnv === 'development' && result.messageId) {
        const previewUrl = nodemailer.getTestMessageUrl(result);
        if (previewUrl) {
          logger.info(`📧 Email preview: ${previewUrl}`);
        }
      }

      logger.info('✅ Email sent successfully', {
        messageId: result.messageId,
        to: options.to,
        subject: options.subject,
        duration: `${duration}ms`,
        transport: emailConfig.gmail.clientId ? 'Gmail OAuth2' : 'SMTP'
      });

      return {
        success: true,
        messageId: result.messageId,
        response: result.response,
        accepted: result.accepted || [],
        rejected: result.rejected || [],
        timestamp: new Date()
      };

    } catch (error) {
      logger.error('❌ Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: error instanceof Error ? {
          message: error.message,
          name: error.name,
          stack: error.stack
        } : String(error)
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }

  async sendTemplateEmail(options: SendTemplateOptions): Promise<EmailResponse> {
    try {
      const rendered = renderTemplate(options.templateName, options.data);

      if (!rendered) {
        throw new Error(`Template not found: ${options.templateName}`);
      }

      return this.sendEmail({
        to: options.to,
        subject: options.subject || rendered.subject,
        html: rendered.html,
        text: rendered.text,
        replyTo: options.replyTo,
        cc: options.cc,
        bcc: options.bcc,
        priority: options.priority,
        headers: options.headers,
        attachments: options.attachments
      });

    } catch (error) {
      logger.error('Failed to send template email', {
        template: options.templateName,
        to: options.to,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  async sendWelcomeEmail(
    email: string,
    userName: string,
    activationLink?: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'welcome',
      subject: `Bienvenue ${userName} !`,
      data: {
        userName,
        activationLink,
        year: new Date().getFullYear()
      }
    });
  }

  async sendPasswordResetEmail(
    email: string,
    resetLink: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'password-reset',
      subject: 'Réinitialisation de votre mot de passe',
      data: { 
        resetLink,
        expiryHours: 1,
        year: new Date().getFullYear()
      }
    });
  }

  async sendProjectMatchEmail(
    email: string,
    projectData: {
      title: string;
      description: string;
      budgetMin: number;
      budgetMax: number;
      currency: string;
      deadline: string;
      skills: string[];
      link: string;
      hoursToApply: number;
    },
    userName: string
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'project-match',
      subject: `Nouveau projet : ${projectData.title}`,
      data: {
        userName,
        projectTitle: projectData.title,
        projectDescription: projectData.description,
        projectBudgetMin: projectData.budgetMin,
        projectBudgetMax: projectData.budgetMax,
        projectCurrency: projectData.currency,
        projectDeadline: projectData.deadline,
        projectSkills: projectData.skills.join(', '),
        projectLink: projectData.link,
        hoursToApply: projectData.hoursToApply,
        year: new Date().getFullYear()
      }
    });
  }

  async sendProposalReceivedEmail(
    email: string,
    proposalData: {
      projectTitle: string;
      proposerName: string;
      proposalMessage: string;
      proposalBudget: number;
      projectCurrency: string;
      proposalDuration: string;
      proposerRating: number;
      proposerReviews: number;
      link: string;
    }
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'proposal-received',
      subject: `Nouvelle proposition pour : ${proposalData.projectTitle}`,
      data: {
        projectTitle: proposalData.projectTitle,
        proposerName: proposalData.proposerName,
        proposalMessage: proposalData.proposalMessage,
        proposalBudget: proposalData.proposalBudget,
        projectCurrency: proposalData.projectCurrency,
        proposalDuration: proposalData.proposalDuration,
        proposerRating: proposalData.proposerRating.toFixed(1),
        proposerReviews: proposalData.proposerReviews,
        proposalLink: proposalData.link,
        year: new Date().getFullYear()
      }
    });
  }

  async sendPaymentConfirmationEmail(
    email: string,
    paymentData: {
      userName: string;
      transactionId: string;
      amount: number;
      currency: string;
      description: string;
      date: string;
      dashboardLink: string;
    }
  ): Promise<EmailResponse> {
    return this.sendTemplateEmail({
      to: email,
      templateName: 'payment-confirmation',
      subject: `Confirmation de paiement - ${paymentData.transactionId}`,
      data: {
        userName: paymentData.userName,
        transactionId: paymentData.transactionId,
        amount: paymentData.amount.toFixed(2),
        currency: paymentData.currency,
        description: paymentData.description,
        paymentDate: new Date(paymentData.date).toLocaleDateString('fr-FR'),
        dashboardLink: paymentData.dashboardLink,
        year: new Date().getFullYear()
      }
    });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      const isValid = await verifyTransport();
      if (isValid) {
        logger.info('✅ Email connection verified');
      } else {
        logger.error('❌ Email connection failed');
      }
      return isValid;
    } catch (error) {
      logger.error('Email verification error:', error);
      return false;
    }
  }

  getAvailableTemplates() {
    return getAvailableTemplates();
  }

  // Private utility methods
  private formatEmailAddress(name: string | undefined, email: string): string {
    if (name && name.trim()) {
      return `"${name.trim()}" <${email}>`;
    }
    return email;
  }

  private formatRecipients(recipients: string | string[]): string {
    if (Array.isArray(recipients)) {
      return recipients.join(', ');
    }
    return recipients;
  }

  async sendBulkEmails(
    emails: Array<{ to: string; subject: string; html: string }>,
    batchSize = 10
  ): Promise<EmailResponse[]> {
    const results: EmailResponse[] = [];
    
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const batchPromises = batch.map(email => 
        this.sendEmail({
          to: email.to,
          subject: email.subject,
          html: email.html
        }).catch(error => ({
          success: false,
          error: error.message,
          to: email.to,
          timestamp: new Date()
        }))
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Pause between batches to avoid rate limits
      if (i + batchSize < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }
}

export const emailService = new EmailService();