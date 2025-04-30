const { supabase } = require('../config/supabase');

// GET /api/job_postings
exports.getAllJobPostings = async (req, res) => {
  const { data, error } = await supabase
    .from('job_postings')
    .select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// POST /api/job_postings
exports.createJobPosting = async (req, res) => {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ error: 'Only employers can create job postings.' });
    }
  
    const { title, description, location, salary } = req.body;
    const employer_id = req.user.id;
  
    const { data, error } = await supabase
      .from('job_postings')
      .insert([{ title, description, location, salary, employer_id }])
      .select();
  
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  };

// PUT /api/job_postings/:id
exports.updateJobPosting = async (req, res) => {
    const { id } = req.params;
    const { title, description, location, salary } = req.body;
  
    // Check role
    if (req.user.role !== 'employer') {
      return res.status(403).json({ error: 'Only employers can update job postings.' });
    }
  
    // Check ownership
    const { data: posting, error: fetchError } = await supabase
      .from('job_postings')
      .select('employer_id')
      .eq('id', id)
      .single();
  
    if (fetchError) return res.status(500).json({ error: fetchError.message });
    if (!posting || posting.employer_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this posting.' });
    }
  
    const { data, error } = await supabase
      .from('job_postings')
      .update({ title, description, location, salary })
      .eq('id', id)
      .select();
  
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
  };
  

// DELETE /api/job_postings/:id
exports.deleteJobPosting = async (req, res) => {
    const { id } = req.params;
  
    // Check role
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only employers or admins can delete job postings.' });
    }
  
    // Fetch job to verify ownership unless admin
    const { data: posting, error: fetchError } = await supabase
      .from('job_postings')
      .select('employer_id')
      .eq('id', id)
      .single();
  
    if (fetchError) return res.status(500).json({ error: fetchError.message });
  
    if (!posting || (req.user.role !== 'admin' && posting.employer_id !== req.user.id)) {
      return res.status(403).json({ error: 'Not authorized to delete this posting.' });
    }
  
    const { error } = await supabase
      .from('job_postings')
      .delete()
      .eq('id', id);
  
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Job posting deleted successfully' });
  };
  

// GET /api/job_postings/:id
exports.getJobPostingById = async (req, res) => {
    const { id } = req.params;
  
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Job not found' });
  
    res.json(data);
  };
  