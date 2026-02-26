
export const emailVerificationTemplate = {
  name: 'email-verification',
  subject: 'Vérifiez votre email - NrbTalents',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Vérifiez votre email</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #f9f9f9;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">Presque terminé!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Merci de vous être inscrit sur NrbTalents. Pour finaliser votre inscription, veuillez vérifier votre adresse email.
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Cliquez sur le bouton ci-dessous pour vérifier votre email:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{verificationLink}}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Vérifier mon email
            </a>
          </div>
          
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:<br>
            <code style="background: #f5f5f5; padding: 8px 12px; border-radius: 4px; font-size: 12px; word-break: break-all;">
              {{verificationLink}}
            </code>
          </p>
          
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              ⚠️ <strong>Ce lien expire dans 24 heures.</strong><br>
              Si vous n'avez pas créé de compte sur NrbTalents, vous pouvez ignorer cet email.
            </p>
          </div>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
          <p style="margin: 5px 0;">
            <a href="https://nrbtalents.com" style="color: #667eea; text-decoration: none;">Site web</a> • 
            <a href="https://nrbtalents.com/help" style="color: #667eea; text-decoration: none;">Aide</a> • 
            <a href="mailto:support@nrbtalents.com" style="color: #667eea; text-decoration: none;">Support</a>
          </p>
        </td>
      </tr>
    </table>
  `
}

export const welcomeTemplate = {
  name: 'welcome',
  subject: 'Bienvenue sur NrbTalents!',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Bienvenue sur NrbTalents!</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #f9f9f9;">
          <h2 style="color: #333; font-size: 20px; margin-top: 0;">Bonjour {{userName}},</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Bienvenue sur <strong>NrbTalents</strong>, la plateforme leader pour connecter les meilleurs talents avec des projets passionnants!
          </p>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Nous sommes ravis de vous avoir à bord. Vous pouvez maintenant:
          </p>
          
          <ul style="color: #666; font-size: 16px; line-height: 1.8; margin-left: 20px;">
            <li>📝 Créer ou parcourir des projets</li>
            <li>💼 Construire votre profil professionnel</li>
            <li>💬 Communiquer avec les clients et freelances</li>
            <li>💰 Gérer vos revenus et paiements</li>
            <li>⭐ Gagner des avis et des recommandations</li>
          </ul>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            {{#if activationLink}}
            Avant de commencer, veuillez confirmer votre adresse email:
            {{/if}}
          </p>
          
          {{#if activationLink}}
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{activationLink}}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Confirmer mon adresse email
            </a>
          </div>
          {{/if}}
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Si vous avez besoin d'aide, n'hésitez pas à <a href="https://support.nrbtalents.com" style="color: #667eea; text-decoration: none;">contacter notre support</a>.
          </p>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            À bientôt sur NrbTalents!<br>
            <strong>L'équipe NrbTalents</strong>
          </p>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
          <p style="margin: 5px 0;">
            <a href="https://nrbtalents.com" style="color: #667eea; text-decoration: none;">Site web</a> • 
            <a href="https://nrbtalents.com/terms" style="color: #667eea; text-decoration: none;">Conditions</a> • 
            <a href="https://nrbtalents.com/privacy" style="color: #667eea; text-decoration: none;">Confidentialité</a>
          </p>
        </td>
      </tr>
    </table>
  `
}

export const passwordResetTemplate = {
  name: 'password-reset',
  subject: 'Réinitialiser votre mot de passe NrbTalents',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: #ff6b6b; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Réinitialiser votre mot de passe</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #fff;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte NrbTalents.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe. Ce lien expire dans <strong>24 heures</strong>.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{resetLink}}" style="display: inline-block; background: #ff6b6b; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Réinitialiser mon mot de passe
            </a>
          </div>
          
          <p style="color: #999; font-size: 13px;">
            Si vous n'avez pas demandé cette réinitialisation, ignorez cet email. Votre mot de passe ne sera pas modifié.
          </p>
          
          <p style="color: #999; font-size: 13px;">
            Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur:<br>
            <code style="background: #f5f5f5; padding: 5px 10px; border-radius: 3px;">{{resetLink}}</code>
          </p>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
        </td>
      </tr>
    </table>
  `
}

export const projectMatchTemplate = {
  name: 'project-match',
  subject: '✨ Un nouveau projet correspond à votre profil!',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✨ Nouveau projet pour vous!</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #f9f9f9;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Bonjour {{userName}},
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Un nouveau projet correspond parfaitement à vos compétences!
          </p>
          
          <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">{{projectTitle}}</h3>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">{{projectDescription}}</p>
            
            <div style="margin: 15px 0; padding-top: 15px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Budget:</strong> {{projectBudgetMin}} - {{projectBudgetMax}} {{projectCurrency}}
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Délai:</strong> {{projectDeadline}}
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Compétences:</strong> {{projectSkills}}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{projectLink}}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Voir le projet
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            <strong>Vous avez {{hoursToApply}} heures</strong> pour candidater et faire connaissance avec le client!
          </p>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
        </td>
      </tr>
    </table>
  `
}

export const proposalReceivedTemplate = {
  name: 'proposal-received',
  subject: 'Vous avez reçu une nouvelle proposition!',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">💬 Nouvelle proposition!</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #f9f9f9;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            {{proposerName}} a soumis une proposition pour votre projet <strong>{{projectTitle}}</strong>.
          </p>
          
          <div style="background: white; border-left: 4px solid #f5576c; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h4 style="color: #333; margin-top: 0;">Détails de la proposition</h4>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              {{proposalMessage}}
            </p>
            
            <div style="margin: 15px 0; padding-top: 15px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Budget proposé:</strong> {{proposalBudget}} {{projectCurrency}}
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Délai estimé:</strong> {{proposalDuration}}
              </p>
              <p style="color: #666; font-size: 14px; margin: 5px 0;">
                <strong>Évaluation:</strong> {{proposerRating}} ⭐ ({{proposerReviews}} avis)
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{proposalLink}}" style="display: inline-block; background: #f5576c; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Voir la proposition
            </a>
          </div>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
        </td>
      </tr>
    </table>
  `
}

export const paymentConfirmationTemplate = {
  name: 'payment-confirmation',
  subject: '✅ Paiement confirmé',
  html: `
    <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✅ Paiement confirmé</h1>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 40px 20px; background: #f9f9f9;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Bonjour {{userName}},
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Nous avons bien reçu votre paiement. Voici un résumé de votre transaction:
          </p>
          
          <div style="background: white; border-left: 4px solid #38ef7d; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h4 style="color: #333; margin-top: 0;">Résumé de paiement</h4>
            <table width="100%" style="border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">ID de transaction:</td>
                <td style="padding: 10px 0; text-align: right; color: #333; font-weight: bold;">{{transactionId}}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Montant:</td>
                <td style="padding: 10px 0; text-align: right; color: #333; font-weight: bold;">{{amount}} {{currency}}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666;">Description:</td>
                <td style="padding: 10px 0; text-align: right; color: #333;">{{description}}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">Date:</td>
                <td style="padding: 10px 0; text-align: right; color: #333;">{{paymentDate}}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Vous pouvez consulter vos reçus et historique de paiements dans votre tableau de bord.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{dashboardLink}}" style="display: inline-block; background: #38ef7d; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Voir mon tableau de bord
            </a>
          </div>
        </td>
      </tr>
      
      <tr>
        <td style="background: #f0f0f0; padding: 20px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #ddd;">
          <p style="margin: 5px 0;">© 2025 NrbTalents. Tous droits réservés.</p>
        </td>
      </tr>
    </table>
  `
}
