const path = require('path')
const nodemailer = require('nodemailer')
const pug = require('pug')
const config = require('../../config')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password
  }
})

const sendEmail = async (to, subject, html, from="Notifications <no-reply@testing.com") => {
  const response = await transporter.sendMail({ from, to, subject, html })
}

const sendNewUserEmail = async (data) => {
  const renderTemplate = pug.compileFile(path.join(process.cwd(), '/src/views/email/newuser.pug'))
  const html = renderTemplate(data)

  await sendEmail(config.admin.email, `Nuevo registro`, html)
}

const sendNewOrderEmail = async (data) => {
  const renderTemplate = pug.compileFile(path.join(process.cwd(), '/src/views/email/neworder.pug'))
  const html = renderTemplate(data)

  await sendEmail(config.admin.email, `Nueva orden`, html)
}

module.exports = {
  sendEmail,
  sendNewUserEmail,
  sendNewOrderEmail
}