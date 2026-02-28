// src/utils/logger.ts
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  
  // Configuration du transport pour le développement
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          // Pour les niveaux de log en texte (equivalent à useLevelLabels)
          levelFirst: true,
          messageFormat: '{level} - {msg}'
        },
      }
    : undefined,
  
  // Format de timestamp ISO
  timestamp: pino.stdTimeFunctions.isoTime,
  
  // Alternative à useLevelLabels - formateurs personnalisés
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  
  // Pour éviter les messages [32m etc. dans les logs
  messageKey: 'msg',
});

export { logger };