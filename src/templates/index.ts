import Handlebars from 'handlebars'
import {emailVerificationTemplate, welcomeTemplate, passwordResetTemplate, projectMatchTemplate, proposalReceivedTemplate, paymentConfirmationTemplate } from './email-templates.js'
import { logger } from '../utils/logger.js'

const templates = [
  welcomeTemplate,
  passwordResetTemplate,
  projectMatchTemplate,
  proposalReceivedTemplate,
  paymentConfirmationTemplate,
  emailVerificationTemplate
]

interface Template {
  name: string
  subject: string
  html: string
}

const compiledTemplates = new Map<string, { subject: HandlebarsTemplateDelegate; html: HandlebarsTemplateDelegate }>()

// Compiler tous les templates au démarrage
templates.forEach(template => {
  compiledTemplates.set(template.name, {
    subject: Handlebars.compile(template.subject),
    html: Handlebars.compile(template.html)
  })
})

// Enregistrer les helpers Handlebars personnalisés
Handlebars.registerHelper('formatCurrency', function(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount)
})

Handlebars.registerHelper('formatDate', function(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

Handlebars.registerHelper('truncate', function(text: string, length: number) {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
})

export function getTemplate(templateName: string): Template | null {
  return templates.find(t => t.name === templateName) || null
}

export function renderTemplate(
  templateName: string,
  data: Record<string, any>
): { subject: string; html: string } | null {
  const compiled = compiledTemplates.get(templateName)
  const template = templates.find(t => t.name === templateName)

  if (!compiled || !template) {
    logger.warn(`Template not found: ${templateName}`)
    return null
  }

  try {
    return {
      subject: compiled.subject(data),
      html: compiled.html(data)
    }
  } catch (error) {
    logger.error(`Failed to render template: ${templateName}`, error)
    return null
  }
}

export function getAvailableTemplates(): Array<{ name: string; subject: string }> {
  return templates.map(t => ({
    name: t.name,
    subject: t.subject
  }))
}
