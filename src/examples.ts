/**
 * Exemple d'utilisation du service Email
 * 
 * À utiliser après npm install et npm run build
 */

import { emailService } from './services/email.service.js'

async function examples() {
  // Exemple 1: Envoyer un email simple
  console.log('--- Exemple 1: Email simple ---')
  try {
    const result = await emailService.sendEmail({
      to: 'user@example.com',
      subject: 'Bienvenue sur NrbTalents',
      html: '<h1>Bienvenue!</h1><p>Merci de vous être inscrit.</p>',
      text: 'Bienvenue sur NrbTalents'
    })
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 2: Envoyer un email de bienvenue avec template
  console.log('\n--- Exemple 2: Template welcome ---')
  try {
    const result = await emailService.sendWelcomeEmail(
      'newuser@example.com',
      'Jean Dupont',
      'https://app.nrbtalents.com/activate?token=abc123'
    )
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 3: Envoyer email de réinitialisation de mot de passe
  console.log('\n--- Exemple 3: Template password-reset ---')
  try {
    const result = await emailService.sendPasswordResetEmail(
      'user@example.com',
      'https://app.nrbtalents.com/reset-password?token=xyz789'
    )
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 4: Envoyer email de match de projet
  console.log('\n--- Exemple 4: Template project-match ---')
  try {
    const result = await emailService.sendProjectMatchEmail(
      'freelancer@example.com',
      {
        title: 'Développement App React Native',
        description: 'Créer une application mobile pour gestion de projets',
        budgetMin: 2000,
        budgetMax: 5000,
        currency: 'MGA',
        deadline: '2025-03-15',
        skills: ['React Native'],
        link: 'https://app.nrbtalents.com/projects/123',
        hoursToApply: 48
      },
      'Alice Martin'
    )
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 5: Envoyer email de proposition reçue
  console.log('\n--- Exemple 5: Template proposal-received ---')
  try {
    const result = await emailService.sendProposalReceivedEmail(
      'client@example.com',
      {
        projectTitle: 'Développement App React Native',
        proposerName: 'Robert Developer',
        proposalMessage: 'Je peux développer cette application en 4 semaines avec une équipe de 2 développeurs.',
        proposalBudget: 3500,
        projectCurrency: 'MGA',
        proposalDuration: '4 semaines',
        proposerRating: 4.8,
        proposerReviews: 25,
        link: 'https://app.nrbtalents.com/proposals/456'
      }
    )
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 6: Envoyer email de confirmation de paiement
  console.log('\n--- Exemple 6: Template payment-confirmation ---')
  try {
    const result = await emailService.sendPaymentConfirmationEmail(
      'user@example.com',
      {
        userName: 'Jean Dupont',
        transactionId: 'TXN-2025-001234',
        amount: 150000,
        currency: 'MGA',
        description: 'Paiement pour projet "Développement App"',
        date: new Date().toISOString(),
        dashboardLink: 'https://app.nrbtalents.com/payments'
      }
    )
    console.log('Email envoyé:', result.messageId)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 7: Obtenir les templates disponibles
  console.log('\n--- Exemple 7: Templates disponibles ---')
  try {
    const templates = emailService.getAvailableTemplates()
    console.log('Templates:', templates)
  } catch (error) {
    console.error('Erreur:', error)
  }

  // Exemple 8: Vérifier la connexion
  console.log('\n--- Exemple 8: Vérifier la connexion ---')
  try {
    const verified = await emailService.verifyConnection()
    console.log('Connexion vérifiée:', verified)
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Lancer les exemples
if (import.meta.url === `file://${process.argv[1]}`) {
  examples().catch(console.error)
}
