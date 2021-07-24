const express = require('express')
const app = express()
const port = 3000
const app_version = 'v0.1.0';

// middleware
app.use(express.json());

const { commands } = require('./command');

app.get('/api/command', (req, res) => {
  res.json({
    "message": app_version
  })
})

app.post('/api/command', (req, res) => {
  const resp = commands.commandExtractor(req.body)
  res.json(resp)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})