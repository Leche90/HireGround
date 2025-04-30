require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const PORT = process.env.PORT || 5000;

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `http://localhost:${PORT}/oauth2callback`
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const getTransporter = async () => {
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });
};

const sendApplicationNotification = async (to, applicantName, jobTitle) => {
  const transporter = await getTransporter();

  const mailOptions = {
    from: `"HireGround" <${process.env.EMAIL_USER}>`,
    to,
    subject: `New Application for ${jobTitle}`,
    text: `${applicantName} has applied for your job posting: ${jobTitle}.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendApplicationNotification };
