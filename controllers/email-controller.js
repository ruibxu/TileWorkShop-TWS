const sgMail = require('../client/node_modules/@sendgrid/mail')
const SENDGRID_API_KEY = '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'
sgMail.setApiKey(SENDGRID_API_KEY)


const sendConfirmEmail = (req, res) => {
  const user_id = req.params.id
  const { email } = req.body
  const msg = {
    to: email, // Change to your recipient
    from: 'tileworkshoptws@gmail.com', // Change to your verified sender
    templateId: 'd-703fe27c09934dc5b217313390de64f0',//Temple ID
    dynamic_template_data: {
      link: "https://tileworkshop.herokuapp.com/verifyaccount/" + user_id
    }
  }
  sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Email sent."
      })
    })
    .catch((error) => {
      console.error(error.body)
    })
}
// email, dynamic_template_data
const sendPasswordResetEmail = (req, res) =>{
  const user_id = req.params.id
  const { email, dynamic_template_data } = req.body
  const msg = {
    to: email, // Change to your recipient
    from: 'tileworkshoptws@gmail.com', // Change to your verified sender
    templateId: 'd-cf2125e69f7944dd8b81552a8477b1a5',//Temple ID
    dynamic_template_data: {
      link: "https://tileworkshop.herokuapp.com/forgetpassword/" + user_id
  }
  }
  sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Email sent."
      })
    })
    .catch((error) => {
      console.error(error)
    })
  }

module.exports = {
    sendConfirmEmail,
    sendPasswordResetEmail
}