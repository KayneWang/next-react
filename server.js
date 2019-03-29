const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) | 8888
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/email/:receiver', (req, res, next) => {
    const actualPage = '/email'
    app.render(req, res, actualPage)
  })

  server.get('/api/getsome', (req, res) => {
    res.json({ user: 'tobi' })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(ex => {
  console.error(ex.stack)
  process.exit(1)
})

// const res = await Axios.get('http://10.114.16.41:8000/cost_email/overview/', {
//   params: { receiver, dimension: 'dept' }
// })