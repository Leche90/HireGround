const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const authenticateToken = require('../middleware/auth');

// Protect all routes
router.use(authenticateToken);

// GET /api/user - Fetch user by ID
router.get('/profile', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.user.id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// PUT /api/user/:id - Update user by ID
router.put('/profile', async (req, res) => {
    try {
      // Map request body to database columns
      const updateData = {
        full_name: req.body.full_name,
        bio: req.body.bio,
        resume_link: req.body.resume_link,
        profile_picture_url: req.body.profilePic,
        email: req.body.email
      };
  
      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', req.user.id)
        .select()
        .single();
  
      if (error) throw error;
      res.json({ 
        message: 'Profile updated',
        user: data 
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Update failed',
        details: error.message 
      });
    }
  });

module.exports = router;