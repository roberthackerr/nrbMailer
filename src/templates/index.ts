import Handlebars from 'handlebars'
import {
  emailVerificationTemplate,
  welcomeTemplate,
  passwordResetTemplate,
  projectMatchTemplate,
  proposalReceivedTemplate,
  paymentConfirmationTemplate
} from './email-templates.js'
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
  text?: string  // 👈 Ajout du champ text optionnel
}

interface CompiledTemplate {
  subject: HandlebarsTemplateDelegate
  html: HandlebarsTemplateDelegate
  text?: HandlebarsTemplateDelegate  // 👈 Ajout du template compilé pour text
}

const compiledTemplates = new Map<string, CompiledTemplate>()

// Compiler tous les templates au démarrage
templates.forEach(template => {
  compiledTemplates.set(template.name, {
    subject: Handlebars.compile(template.subject),
    html: Handlebars.compile(template.html),
    text: template.text ? Handlebars.compile(template.text) : undefined  // 👈 Compilation conditionnelle
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
): {
  subject: string
  html: string
  text?: string  // 👈 Ajout du text dans le retour
} | null {
  const compiled = compiledTemplates.get(templateName)
  const template = templates.find(t => t.name === templateName)

  if (!compiled || !template) {
    logger.warn(`Template not found: ${templateName}`)
    return null
  }

  try {
    const result: {
      subject: string
      html: string
      text?: string
    } = {
      subject: compiled.subject(data),
      html: compiled.html(data)
    }

    // 👈 Ajout du text version si disponible
    if (compiled.text) {
      result.text = compiled.text(data)
    }

    return result
  } catch (error) {
    logger.error(`Failed to render template: ${templateName}`, error)
    return null
  }
}

export function getAvailableTemplates(): Array<{ name: string; subject: string; hasText: boolean }> {
  return templates.map(t => ({
    name: t.name,
    subject: t.subject,
    hasText: !!t.text  // 👈 Indique si une version text est disponible
  }))
}