require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { google } = require('googleapis');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
require('events').EventEmitter.defaultMaxListeners = 20;

const app = express();

// Configuration
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/oauth2callback';

// Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Make Supabase client available to routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Job Tracker API is running' });
});

// Google OAuth Callback Route - Improved with better error handling
app.get('/oauth2callback', async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      console.error('OAuth Error:', error);
      return res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
      return res.redirect(`${FRONTEND_URL}/login?error=missing_authorization_code`);
    }

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken({
      code,
      access_type: 'offline',
      prompt: 'consent'
    });

    if (!tokens.access_token) {
      throw new Error('No access token received');
    }

    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    if (!userInfo.email) {
      throw new Error('No email received from Google');
    }

    // Store/update user in database
    const { data: user, error: dbError } = await supabase
      .from('users')
      .upsert({
        email: userInfo.email,
        google_id: userInfo.id,
        google_access_token: tokens.access_token,
        google_refresh_token: tokens.refresh_token,
        token_expiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // Create session (simplified example)
    res.cookie('session', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    return res.redirect(`${FRONTEND_URL}/dashboard`);

  } catch (err) {
    console.error('OAuth processing error:', err);
    return res.redirect(`${FRONTEND_URL}/login?error=authentication_failed`);
  }
});

// Improved Token Refresh Endpoint
app.post('/api/auth/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oauth2Client.refreshAccessToken();

    // Update database
    const { error } = await supabase
      .from('users')
      .update({
        google_access_token: credentials.access_token,
        token_expiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null
      })
      .eq('google_refresh_token', refreshToken);

    if (error) throw error;

    return res.json({
      access_token: credentials.access_token,
      expires_in: credentials.expiry_date
    });

  } catch (err) {
    console.error('Refresh error:', err);
    return res.status(401).json({ error: 'Token refresh failed' });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/job_applications', require('./routes/jobApplications'));
app.use('/api/user', require('./routes/user'));
app.use('/api/job_postings', require('./routes/jobPostings'));
app.use('/api/applications', require('./routes/applications'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OAuth callback URL: ${GOOGLE_REDIRECT_URI}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});