const config = require('../config')
const Message = require('../models/Message')

class GeneralController {
  async chatResponse(req, res) {
    try {
      const messages = await Message.find({}).lean()
      const emails = await Message.distinct('email')
      res.render('chatresponse.hbs', { messages, emails })
    }
    catch(error) {
      next(error)
    }
  }

  serverInfo(req, res) {
    const serverInfo = {
      args: JSON.stringify(process.argv, null, 2),
      execPath: process.execPath,
      platform: process.platform,
      pid: process.pid,
      version: process.version,
      projectPath: process.cwd(),
      rss: JSON.stringify(process.memoryUsage(), null, 2)
    }
    res.render('serverInfo.pug', { serverInfo })
  }

  config(req, res) {
    res.render('config.hbs', { config })
  }
}

module.exports = new GeneralController