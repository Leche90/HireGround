jobController.js
const getJobs = async (req, res) => {
    try {
      const { data, error } = await req.supabase
        .from('jobs')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false });
  
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const createJob = async (req, res) => {
    const { title, company, status, resume_link, notes } = req.body;
    try {
      const { data, error } = await req.supabase
        .from('jobs')
        .insert([{ user_id: req.user.id, title, company, status, resume_link, notes }])
        .select()
        .single();
  
      if (error) throw error;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, company, status, resume_link, notes } = req.body;
    try {
      const { data, error } = await req.supabase
        .from('jobs')
        .update({ title, company, status, resume_link, notes })
        .eq('id', id)
        .eq('user_id', req.user.id)
        .select()
        .single();
  
      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Job not found' });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
      const { data, error } = await req.supabase
        .from('jobs')
        .delete()
        .eq('id', id)
        .eq('user_id', req.user.id)
        .select()
        .single();
  
      if (error) throw error;
      if (!data) return res.status(404).json({ error: 'Job not found' });
      res.json({ message: 'Job deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { getJobs, createJob, updateJob, deleteJob };