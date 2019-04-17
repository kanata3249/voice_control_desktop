const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const path = require('path')

require('console')

module.exports = class ApiServer {
  constructor() {
    this.settings = null
    this.handler = null
    this.httpsServer = null
    this.httpServer = null

    this.httpServer = express()
    this.httpServer.use(bodyParser.json())
    this.httpServer.post('/input', (req, res) => {
      if (this.handler['input'] && this.handler['input'](req.body["data"])) {
        res.json({ "status": "ok"})
      } else {
        res.status(400).send('Bad Request')
      }
    })
    this.httpServer.get('/buttons', (req, res) => {
      if (this.handler['buttons']) {
        res.json(this.handler['buttons']())
      } else {
        res.status(400).send('Bad Request')
      }
    })
  }

  setSettings(settings) {
    this.settings = settings
  }

  setApiHandler(handler) {
    this.handler = handler
  }

  start() {
    if (this.settings.settings) {
      const httpsOptions = {
        key: fs.readFileSync(path.join(__dirname, '../../../cert/server_key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../../../cert/server_cert.pem'))
      }
      this.httpsServer = https.createServer(httpsOptions, this.httpServer);
//      this.httpsServer = http.createServer(this.httpServer);
      this.httpsServer.listen(this.settings.settings.portNo)
    }
  }

  stop() {
    if (this.httpsServer) {
      this.httpsServer.close()
      this.httpsServer = null
    }
  }
}