import { EOL } from 'os'
import { serializeError } from 'serialize-error'
import winston from 'winston'
import * as yaml from 'yaml'
import { env } from './env'

// Настройка цветов для уровней логирования
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
}

// Добавляем цвета в Winston
winston.addColors(customColors)

// Создаем Winston Logger
export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }), // Включаем цветизацию для всех полей
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      const metaString = Object.keys(meta).length ? `${EOL}${yaml.stringify(meta)}` : ''
      return `${timestamp} ${level}: ${message}${metaString}`
    }),
  ),
  defaultMeta: { service: 'backend', hostEnv: env.HOST_ENV },
  transports: [new winston.transports.Console()],
})

// Обертка для удобного использования логгера
export const logger = {
  info: (logType: string, message: string, meta?: Record<string, any>) => {
    winstonLogger.info(message, { logType, ...meta })
  },
  error: (logType: string, error: any, meta?: Record<string, any>) => {
    const serializedError = serializeError(error)
    winstonLogger.error(serializedError.message || 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...meta,
    })
  },
}
