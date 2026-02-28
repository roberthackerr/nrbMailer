// templates/email-templates.ts

export interface EmailTemplate {
  name: string
  subject: string
  html: string
  text: string  // 👈 VERSION TEXTE OBLIGATOIRE pour éviter les erreurs
}

export const emailVerificationTemplate: EmailTemplate = {
  name: 'email-verification',
  subject: 'Vérifiez votre email - NrbTalents',
  html: `...`, // Votre HTML existant
  text: `Vérifiez votre email - NrbTalents

Bonjour,

Merci de vous être inscrit sur NrbTalents. Pour finaliser votre inscription, veuillez vérifier votre adresse email.

Cliquez sur ce lien pour vérifier votre email:
{{verificationLink}}

⚠️ Ce lien expire dans 24 heures.
Si vous n'avez pas créé de compte sur NrbTalents, vous pouvez ignorer cet email.

© 2025 NrbTalents. Tous droits réservés.
Site web: https://nrbtalents.com
Support: mailto:support@nrbtalents.com`
}

export const welcomeTemplate: EmailTemplate = {
  name: 'welcome',
  subject: 'Bienvenue sur NrbTalents!',
  html: `...`, // Votre HTML existant
  text: `Bienvenue sur NrbTalents!

Bonjour {{userName}},

Bienvenue sur NrbTalents, la plateforme leader pour connecter les meilleurs talents avec des projets passionnants!

Nous sommes ravis de vous avoir à bord. Vous pouvez maintenant:
- 📝 Créer ou parcourir des projets
- 💼 Construire votre profil professionnel
- 💬 Communiquer avec les clients et freelances
- 💰 Gérer vos revenus et paiements
- ⭐ Gagner des avis et des recommandations

{{#if activationLink}}
Avant de commencer, veuillez confirmer votre adresse email:
{{activationLink}}
{{/if}}

Si vous avez besoin d'aide, contactez notre support: https://support.nrbtalents.com

À bientôt sur NrbTalents!
L'équipe NrbTalents

© 2025 NrbTalents. Tous droits réservés.
Site web: https://nrbtalents.com`
}

export const passwordResetTemplate: EmailTemplate = {
  name: 'password-reset',
  subject: 'Réinitialiser votre mot de passe NrbTalents',
  html: `...`, // Votre HTML existant
  text: `Réinitialiser votre mot de passe NrbTalents

Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte NrbTalents.

Cliquez sur ce lien pour réinitialiser votre mot de passe (expire dans 24 heures):
{{resetLink}}

Si vous n'avez pas demandé cette réinitialisation, ignorez cet email. Votre mot de passe ne sera pas modifié.

© 2025 NrbTalents. Tous droits réservés.`
}

export const projectMatchTemplate: EmailTemplate = {
  name: 'project-match',
  subject: '✨ Un nouveau projet correspond à votre profil!',
  html: `...`, // Votre HTML existant
  text: `✨ NOUVEAU PROJET POUR VOUS!

Bonjour {{userName}},

Un nouveau projet correspond parfaitement à vos compétences!

Titre: {{projectTitle}}
Description: {{projectDescription}}
Budget: {{projectBudgetMin}} - {{projectBudgetMax}} {{projectCurrency}}
Délai: {{projectDeadline}}
Compétences: {{projectSkills}}

Voir le projet: {{projectLink}}

⚠️ Vous avez {{hoursToApply}} heures pour candidater!

© 2025 NrbTalents. Tous droits réservés.`
}

export const proposalReceivedTemplate: EmailTemplate = {
  name: 'proposal-received',
  subject: 'Vous avez reçu une nouvelle proposition!',
  html: `...`, // Votre HTML existant
  text: `💬 NOUVELLE PROPOSITION!

{{proposerName}} a soumis une proposition pour votre projet "{{projectTitle}}".

Message: {{proposalMessage}}
Budget proposé: {{proposalBudget}} {{projectCurrency}}
Délai estimé: {{proposalDuration}}
Évaluation: {{proposerRating}}/5 ({{proposerReviews}} avis)

Voir la proposition: {{proposalLink}}

© 2025 NrbTalents. Tous droits réservés.`
}

export const paymentConfirmationTemplate: EmailTemplate = {
  name: 'payment-confirmation',
  subject: '✅ Paiement confirmé',
  html: `...`, // Votre HTML existant
  text: `✅ PAIEMENT CONFIRMÉ

Bonjour {{userName}},

Nous avons bien reçu votre paiement.

Résumé de la transaction:
- ID de transaction: {{transactionId}}
- Montant: {{amount}} {{currency}}
- Description: {{description}}
- Date: {{paymentDate}}

Vous pouvez consulter vos reçus dans votre tableau de bord: {{dashboardLink}}

© 2025 NrbTalents. Tous droits réservés.`
}