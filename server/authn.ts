import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from '@kinde-oss/kinde-typescript-sdk'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import type { Context } from 'hono'
import type { CookieOptions } from 'hono/utils/cookie'
import { createMiddleware } from 'hono/factory'

const authOpts = {
  authDomain: process.env.KINDE_DOMAIN!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: process.env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
}

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  authOpts
)

let store: Record<string, unknown> = {}

export const sessionManager = (ctx: Context): SessionManager => ({
  async getSessionItem(key: string) {
    return getCookie(ctx, key)
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOpts: CookieOptions = {
      httpOnly: true,
      sameSite: `lax`,
      secure: true,
    }
    if (typeof value === `string`) setCookie(ctx, key, value, cookieOpts)
    else setCookie(ctx, key, JSON.stringify(value), cookieOpts)
  },
  async removeSessionItem(key: string) {
    deleteCookie(ctx, key)
  },
  async destroySession() {
    const AUTH_TOKENS = [`id_token`, `access_token`, `user`, `refresh_token`]
    AUTH_TOKENS.forEach(key => deleteCookie(ctx, key))
  },
})

type Env = {
  Variables: { user: UserType }
}

export const verifyUser = createMiddleware<Env>(async (ctx, next) => {
  try {
    const _sessionManager = sessionManager(ctx)
    const isAuthenticated = await kindeClient.isAuthenticated(_sessionManager)
    if (!isAuthenticated) {
      return ctx.json({ error: `Unauthorised` }, 401)
    }
    const user = await kindeClient.getUserProfile(_sessionManager)
    ctx.set(`user`, user)
    await next()
  } catch (err) {
    console.error(err)
    return ctx.json({ error: `Unauthorised` }, 401)
  }
})
