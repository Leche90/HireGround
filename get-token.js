// Updated get-token.js
const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/oauth2callback'
);

async function getToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.send',
    prompt: 'consent' // Forces new token generation
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  console.log('⚠️ Copy the code IMMEDIATELY after authorization');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Paste the code here (within 1 minute): ', async (code) => {
    rl.close();
    try {
      const { tokens } = await oauth2Client.getToken(code.trim()); // Trim whitespace
      console.log('\n✅ Success! Add these to your .env file:');
      console.log(`GMAIL_ACCESS_TOKEN=${tokens.access_token}`);
      console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}`);
    } catch (error) {
      console.error('\n❌ Failed to get tokens. Common fixes:');
      console.log('- Code expired (generate new one)');
      console.log('- Redirect URI mismatch (check Google Cloud)');
      console.log('- Incorrect client ID/secret');
      console.error('Full error:', error.message);
    }
  });
}

getToken();