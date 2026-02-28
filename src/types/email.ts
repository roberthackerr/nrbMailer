export interface EmailOptions {
  // Destinataires (obligatoire)
  to: string | string[]
  
  // Sujet de l'email (obligatoire)
  subject: string
  
  // Contenu HTML (obligatoire)
  html: string
  
  // Contenu texte brut (optionnel mais recommandé)
  text?: string
  
  // Expéditeur (optionnel - utilise defaultFrom si non fourni)
  from?: {
    name?: string    // Nom d'affichage (optionnel)
    email: string    // Email de l'expéditeur (obligatoire)
  }
  
  // Répondre à (optionnel)
  replyTo?: string
  
  // Copie carbone (optionnel)
  cc?: string | string[]
  
  // Copie carbone invisible (optionnel)
  bcc?: string | string[]
  
  // Pièces jointes (optionnel)
  attachments?: Array<{
    filename: string           // Nom du fichier
    content?: Buffer | string  // Contenu du fichier
    path?: string              // Ou chemin vers le fichier
    contentType?: string       // Type MIME (optionnel)
    cid?: string               // Content ID pour les images inline
    encoding?: string          // Encoding (ex: 'base64')
  }>
  
  // Headers personnalisés (optionnel)
  headers?: Record<string, string>
  
  // Priorité de l'email (optionnel)
  priority?: 'high' | 'normal' | 'low'
  
  // Email de réponse (optionnel - différent de replyTo)
  inReplyTo?: string
  
  // Références pour les threads (optionnel)
  references?: string[]
  
  // Encodage (optionnel - défaut: 'utf-8')
  encoding?: string
  
  // Date d'envoi personnalisée (optionnel)
  date?: Date | string
}

// Type pour les templates
export interface SendTemplateOptions {
  to: string | string[]
  templateName: string
  data: Record<string, any>
  subject?: string  // Surcharge le sujet du template
  from?: {
    name?: string
    email: string
  }
  replyTo?: string
  cc?: string | string[]
  bcc?: string | string[]
  priority?: 'high' | 'normal' | 'low'
  headers?: Record<string, string>
  attachments?: Array<{
    filename: string
    content?: Buffer | string
    path?: string
    contentType?: string
    cid?: string
  }>
}

// Type pour la réponse
export interface EmailResponse {
  success: boolean
  messageId?: string
  response?: string
  accepted?: string[]
  rejected?: string[]
  rejectedErrors?: Array<{
    message: string
    recipient: string
  }>
  error?: string
  timestamp: Date
}

// Type pour la configuration du service
export interface EmailServiceConfig {
  defaultFrom: {
    name: string
    email: string
  }
  retryOptions?: {
    maxRetries: number
    delayMs: number
    backoffMultiplier: number
  }
  batchSize?: number
}

// Type pour l'envoi en lots
export interface BulkEmailItem {
  to: string
  subject: string
  html: string
  text?: string
  data?: Record<string, any>  // Pour les templates
  templateName?: string       // Alternative au HTML direct
}