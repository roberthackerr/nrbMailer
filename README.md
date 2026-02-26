# Nodemailer Email Service pour NrbTalents

Service email robuste basé sur Nodemailer pour l'envoi d'emails à travers NrbTalents.

## 🚀 Fonctionnalités

- **Multiples transports**: Gmail, SMTP custom, SendGrid, AWS SES
- **Templates HTML**: Lettres de motivation, confirmations, notifications
- **Gestion des erreurs**: Retry logic, logging structuré
- **Validation**: Schémas Joi pour les requêtes
- **Rate limiting**: Protection contre les abus
- **Queue d'emails**: Support Redis/Bull pour les emails asynchrones
- **Logs structurés**: Pino logger avec niveaux configurables

## 📦 Installation

```bash
npm install
cp .env.example .env
```

Configurez votre `.env` avec vos credentials d'email.

## 🛠️ Configuration

### Option 1: Gmail avec App Password

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

[Comment générer App Password Gmail](https://support.google.com/accounts/answer/185833)

### Option 2: SMTP Custom

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_SECURE=false
```

### Option 3: SendGrid

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
```

### Option 4: AWS SES

```env
AWS_SES_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SES_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SES_REGION=eu-west-1
```

## 🚀 Démarrage

### Développement

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

### Production

```bash
npm run build
npm start
```

## 📧 API Endpoints

### Envoyer un email simple

```bash
POST /api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Bienvenue!",
  "html": "<h1>Bienvenue sur NrbTalents</h1>",
  "replyTo": "support@nrbtalents.com"
}
```

### Envoyer avec template

```bash
POST /api/email/send-template
Content-Type: application/json

{
  "to": "user@example.com",
  "templateName": "welcome",
  "data": {
    "userName": "Jean Dupont",
    "activationLink": "https://app.com/activate?token=xxx"
  }
}
```

### Templates disponibles

- `welcome`: Email de bienvenue
- `password-reset`: Réinitialisation de mot de passe
- `email-verification`: Vérification d'email
- `project-match`: Notification de match de projet
- `proposal-received`: Notification de proposition reçue
- `payment-confirmation`: Confirmation de paiement

### Envoyer email de notification

```bash
POST /api/email/notify
Content-Type: application/json

{
  "userId": "user-id",
  "type": "proposal_received",
  "data": {
    "projectTitle": "Développement App React",
    "proposalAmount": 1500
  }
}
```

### Vérifier le statut d'un email

```bash
GET /api/email/status/:messageId
```

## 🏗️ Structure du projet

```
nodemailer/
├── src/
│   ├── config/
│   │   ├── mailer.ts           # Initialisation Nodemailer
│   │   ├── transports.ts       # Définition des transports
│   │   └── email-config.ts     # Configuration globale
│   ├── templates/
│   │   ├── welcome.ts          # Template bienvenue
│   │   ├── password-reset.ts   # Template réinitialisation
│   │   ├── project-match.ts    # Template match projet
│   │   └── index.ts            # Export des templates
│   ├── services/
│   │   ├── email.service.ts    # Service d'envoi d'emails
│   │   ├── template.service.ts # Service de compilation templates
│   │   └── queue.service.ts    # Service de queue (optionnel)
│   ├── routes/
│   │   └── email.routes.ts     # Routes API
│   ├── middleware/
│   │   ├── validation.ts       # Validation des requêtes
│   │   ├── error-handler.ts    # Gestion des erreurs
│   │   └── rate-limit.ts       # Rate limiting
│   ├── types/
│   │   ├── email.ts            # Types email
│   │   └── config.ts           # Types configuration
│   ├── utils/
│   │   ├── logger.ts           # Logger Pino
│   │   └── retry.ts            # Logique de retry
│   └── index.ts                # Point d'entrée
├── .env.example
├── package.json
└── tsconfig.json
```

## 🔄 Exemples de requêtes

### Avec cURL

```bash
# Envoyer email simple
curl -X POST http://localhost:3001/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'

# Avec template
curl -X POST http://localhost:3001/api/email/send-template \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "templateName": "welcome",
    "data": {
      "userName": "Jean"
    }
  }'
```

### Avec Node.js

```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:3001/api/email/send', {
  to: 'user@example.com',
  subject: 'Bienvenue!',
  html: '<h1>Bienvenue</h1>'
});

console.log(response.data);
```

### Avec Python

```python
import requests

data = {
    'to': 'user@example.com',
    'subject': 'Bienvenue!',
    'html': '<h1>Bienvenue</h1>'
}

response = requests.post('http://localhost:3001/api/email/send', json=data)
print(response.json())
```

## 🧪 Tests

```bash
npm run test
```

## 📝 Logs

Les logs sont structurés avec Pino:

```
[17:30:45.123] INFO: Email sent successfully
  messageId: "eJ9R8s2K"
  to: "user@example.com"
  subject: "Welcome"
  duration: 234
```

## ⚠️ Erreurs courantes

### Erreur: "Invalid credentials"
- Vérifiez vos credentials dans `.env`
- Pour Gmail, utilisez une App Password, pas le mot de passe du compte
- Assurez-vous que la connection SMTP est autorisée

### Erreur: "ECONNREFUSED"
- Le serveur SMTP est inaccessible
- Vérifiez l'host, port et firewall

### Erreur: "Too many requests"
- Rate limiting activé
- Attendez quelques minutes avant de réessayer

## 🔐 Sécurité

- ✅ Validation des inputs avec Joi
- ✅ Protection CORS
- ✅ Rate limiting
- ✅ Helmet pour les headers HTTP
- ✅ Variables d'environnement sensibles
- ✅ Logging des erreurs sans exposer les credentials

## 📚 Ressources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)
- [Pino Logger](https://getpino.io/)
- [Joi Validation](https://joi.dev/)

## 📧 Support

Pour des questions ou problèmes, créez une issue ou contactez support@nrbtalents.com

## 📄 License

MIT
# nrbMailer
