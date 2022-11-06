const sgMail = require('@sendgrid/mail')
// const SENDGRID_API_KEY = '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'
// sgMail.setApiKey(SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const sendMail = (mail) =>{
const msg = {
  to: 'yorkwyj@gmail.com', // Change to your recipient
  from: 'tileworkshoptws@gmail.com', // Change to your verified sender
  templateId: 'd-703fe27c09934dc5b217313390de64f0',
  dynamic_template_data: {link:'www.google.com'}
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
// }

// export default sendMail;