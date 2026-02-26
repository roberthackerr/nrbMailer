// src/utils/retry.ts
import { logger } from './logger.js'

interface RetryOptions {
  maxRetries?: number
  delayMs?: number
  backoffMultiplier?: number
  shouldRetry?: (error: any) => boolean
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delayMs = 1000,
    backoffMultiplier = 2,
    shouldRetry = () => true
  } = options

  let lastError: Error
  let delay = delayMs

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw lastError
      }

      logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms`, {
        error: lastError.message,
        attempt,
        maxRetries
      })

      await new Promise(resolve => setTimeout(resolve, delay))
      delay *= backoffMultiplier
    }
  }

  throw lastError!
}