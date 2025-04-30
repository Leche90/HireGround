const getJobs = async (req, res) => {
  try {
    const { status, company, sort = 'created_at', order = 'desc' } = req.query;

    let query = req.supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', req.user.id);

    if (status) {
      query = query.eq('status', status);
    }

    if (company) {
      query = query.ilike('company', `%${company}%`);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
  const createJob = async (req, res) => {
    const { job_title, company, status, resume_link, notes } = req.body;
    try {
      const { data, error } = await req.supabase
        .from('job_applications')
        .insert([{ user_id: req.user.id, job_title, company, status, resume_link, notes }])
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
    const { job_title, company, status, resume_link, notes } = req.body;
    try {
      const { data, error } = await req.supabase
        .from('job_applications')
        .update({ job_title, company, status, resume_link, notes })
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

  const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
      const { data, error } = await req.supabase
        .from('job_applications')
        .select('*')
        .eq('id', id)
        .eq('user_id', req.user.id)
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
        .from('job_applications')
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
  
module.exports = { getJobs, createJob, updateJob, getJobById, deleteJob };