const express = require('express');
const app = express();
const mysqlDB = require('promise-mysql');

const { commands } = require('./command');

const port = 3000
const app_version = 'v0.2.1';
const dbSetting = {
  user: "root",
  password: "",
  dbname: "test",
}

const db = mysqlDB.createPool({
  user: dbSetting.user,
  password: dbSetting.password,
  database: dbSetting.dbname
})

// middleware
app.use(express.json());

db.then(connection => {

  app.get('/api/command', (req, res) => {
    res.json({
      "message": app_version
    })
  })

  app.post('/api/command', async (req, res) => {
    const resp = await commands.commandExtractor(req.body, connection)
    res.json(resp)
  })

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
})

