import { env } from 'process'
import { type Express } from 'express'
import { Passport } from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { type AppContext } from './ctx'

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport()

  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined')
  }

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: jwtPayload },
          })
          .then((user) => {
            if (!user) {
              done(null, false)
              return
            }
            done(null, user)
          })
          .catch((error) => {
            done(error, false)
          })
      },
    ),
  )

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next()
      return
    }
    passport.authenticate('jwt', { session: false })(req, res, next)
  })
}
