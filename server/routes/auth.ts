import { verifyUser } from './../authn'
import { Hono } from 'hono'
import { kindeClient, sessionManager } from '../authn'

export const Auth = new Hono()
  .get('/login', async ctx => {
    const loginUrl = await kindeClient.login(sessionManager(ctx))
    return ctx.redirect(loginUrl.toString())
  })
  .get('/register', async ctx => {
    const registerUrl = await kindeClient.register(sessionManager(ctx))
    return ctx.redirect(registerUrl.toString())
  })
  .get('/callback', async ctx => {
    const url = new URL(ctx.req.url)
    await kindeClient.handleRedirectToApp(sessionManager(ctx), url)
    return ctx.redirect('/')
  })
  .get('/logout', async ctx => {
    const logoutUrl = await kindeClient.logout(sessionManager(ctx))
    return ctx.redirect(logoutUrl.toString())
  })
  .get(`/user`, verifyUser, async ctx => {
    const user = ctx.var.user
    return ctx.json({ user })
  })
