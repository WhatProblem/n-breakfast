const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())
router.get('/getTest', async (ctx) => {
  ctx.body = JSON.stringify({ code: 200, data: { title: 'my ssr', common:ctx.headers } })
})
router.get('/getHome', async (ctx) => {
  ctx.body = JSON.stringify({ code: 200, data: { title: 'my home ssr' } })
})
router.post('/postData', async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = JSON.stringify({ code: 200, data: { title: 'my post ssr', common:ctx.headers,obj: ctx.request.body } })
})
app.use(router.routes(), router.allowedMethods())


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
