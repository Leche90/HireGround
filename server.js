require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();

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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
