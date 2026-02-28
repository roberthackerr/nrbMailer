// src/utils/logger.ts
import pino from 'pino';

// Configuration corrigée
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',  // Assurez-vous que c'est une string valide
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  // Ajoutez cette ligne pour éviter l'erreur
  useLevelLabels: true,
  timestamp: pino.stdTimeFunctions.isoTime,
});

export { logger };