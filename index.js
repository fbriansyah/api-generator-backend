const express = require('express')
const app = express()
const port = 3000

// middleware
app.use(express.json());

const { commands } = require('./command');

app.get('/api/command', (req, res) => {
  res.json({
    "message": "v0.1.0"
  })
})

app.post('/api/command', (req, res) => {
  const resp = commands.commandExtractor(req.body)
  res.json(resp)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})