import { EOL } from 'os'
import { TRPCError } from '@trpc/server'
import debug from 'debug'
import _ from 'lodash'
import { serializeError } from 'serialize-error'
import { MESSAGE } from 'triple-beam'
import winston from 'winston'
import * as yaml from 'yaml'
import { deepMap } from '../utils/deepMap'
import { env } from './env'
import { ExpectedError } from './error'
import { sentryCaptureException } from './sentry'

export const colorize = new (class {
  color = (code: number, ended = false, ...messages: any[]) =>
    `\x1b[${code}m${messages.join(' ')}${ended ? '\x1b[0m' : ''}`

  black = this.color.bind(null, 30, false)
  red = this.color.bind(null, 31, false)
  green = this.color.bind(null, 32, false)
  yellow = this.color.bind(this, 33, false)
  blue = this.color.bind(this, 34, false)
  magenta = this.color.bind(this, 35, false)
  cyan = this.color.bind(this, 36, false)
  white = this.color.bind(this, 37, false)
  bgBlack = this.color.bind(this, 40, true)
  bgRed = this.color.bind(this, 41, true)
  bgGreen = this.color.bind(this, 42, true)
  bgYellow = this.color.bind(this, 43, true)
  bgBlue = this.color.bind(this, 44, true)
  bgMagenta = this.color.bind(this, 45, true)
  bgCyan = this.color.bind(this, 46, true)
  bgWhite = this.color.bind(this, 47, true)
})()
const color = colorize

export type LoggerMetaData = Record<string, any> | undefined
const prettifyMeta = (meta: LoggerMetaData): LoggerMetaData => {
  return deepMap(meta, ({ key, value }) => {
    if (['email', 'password', 'newPassword', 'oldPassword', 'token', 'text', 'description'].includes(key)) {
      return '🙈'
    }
    return value
  })
}

export const winstonLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'backend', hostEnv: env.HOST_ENV },
  transports: [
    new winston.transports.Console({
      format:
        env.HOST_ENV !== 'local'
          ? winston.format.json()
          : winston.format((logData) => {
              const setColor = {
                info: (str: string) => color.blue(str),
                error: (str: string) => color.red(str),
                debug: (str: string) => color.cyan(str),
              }[logData.level as 'info' | 'error' | 'debug']
              const levelAndType = `${logData.level} ${logData.logType}`
              const topMessage = `${setColor(levelAndType)} ${color.green(logData.timestamp)}${EOL}${logData.message}`

              const visibleMessageTags = _.omit(logData, [
                'level',
                'logType',
                'timestamp',
                'message',
                'service',
                'hostEnv',
              ])

              const stringifyedLogData = _.trim(
                yaml.stringify(visibleMessageTags, (_k, v) => (_.isFunction(v) ? 'Function' : v)),
              )

              const resultLogData = {
                ...logData,
                [MESSAGE]:
                  [topMessage, Object.keys(visibleMessageTags).length > 0 ? `${EOL}${stringifyedLogData}` : '']
                    .filter(Boolean)
                    .join('') + EOL,
              }

              return resultLogData
            })(),
    }),
  ],
})

export const logger = {
  info: (logType: string, message: string, meta?: LoggerMetaData) => {
    if (!debug.enabled(`ideanick:${logType}`)) {
      return
    }
    winstonLogger.info(message, { logType, ...prettifyMeta(meta) })
  },
  error: (logType: string, error: any, meta?: LoggerMetaData) => {
    const isNativeExpectedError = error instanceof ExpectedError
    const isTrpcExpectedError = error instanceof TRPCError && error.cause instanceof ExpectedError
    const prettifiedMetaData = prettifyMeta(meta)
    if (!isNativeExpectedError && !isTrpcExpectedError) {
      sentryCaptureException(error, prettifiedMetaData)
    }
    if (!debug.enabled(`ideanick:${logType}`)) {
      return
    }
    const serializedError = serializeError(error)
    winstonLogger.error(serializedError.message || 'Unknown error', {
      logType,
      error,
      errorStack: serializedError.stack,
      ...prettifiedMetaData,
    })
  },
}
