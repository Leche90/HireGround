require('dotenv').config();
const { google } = require('googleapis');
const express = require('express');

const app = express();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, 
  process.env.GOOGLE_CLIENT_SECRET,
  `http://localhost:${PORT}/oauth2callback`
);

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send',
  });
  console.log('Redirecting to:', authUrl);
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log('Tokens acquired:', tokens);
    res.json({ message: 'Successfully authenticated!' });
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(400).json({ error: 'Error during OAuth callback' });
  }
});

app.listen(5001, () => console.log('OAuth server running on http://localhost:5000'));
