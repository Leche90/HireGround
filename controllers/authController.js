const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const signup = async (req, res) => {
  const { email, password, full_name, bio, role, profile_picture_url, resume_link } = req.body;
  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, 
        password: hashedPassword, 
        full_name, 
        bio, 
        role: role || 'job_seeker',  // Default to 'job_seeker' if no role provided
        profile_picture_url,
        resume_link }])
      .select()
      .single();

    if (error) throw error;

    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: { id: data.id, email: data.email, full_name: data.full_name, bio: data.bio, role: data.role, profile_picture_url: data.profile_picture_url, resume_link: data.resume_link } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, email: user.email, full_name: user.full_name, bio: user.bio, role: user.role, profile_picture_url: user.profile_picture_url, resume_link: user.resume_link } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const requestPasswordReset = async (req, res) => {
    const { email } = req.body;  
    try {
      const token = crypto.randomBytes(32).toString('hex');
      const expiry = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
  
      const { error } = await supabase
        .from('users')
        .update({ reset_token: token, reset_token_expiry: expiry.toISOString() })
        .eq('email', email);
  
      if (error) throw error;
  
      // In real world: email this token. For now, return it.
      res.json({ message: 'Reset link generated', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const resetPassword = async (req, res) => {
    const { token, new_password } = req.body;
  
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, reset_token_expiry')
        .eq('reset_token', token)
        .single();
  
      if (error || !user) throw new Error('Invalid or expired token');
  
      if (new Date(user.reset_token_expiry) < new Date())
        return res.status(400).json({ error: 'Token expired' });
  
      const hashed = await bcrypt.hash(new_password, 10);
  
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: hashed, reset_token: null, reset_token_expiry: null })
        .eq('id', user.id);
  
      if (updateError) throw updateError;
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { signup, login, requestPasswordReset, resetPassword };
