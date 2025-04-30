const { supabase } = require('../config/supabase');
const { sendApplicationNotification } = require('../mailer');

exports.applyToJob = async (req, res) => {
  const { job_id, resume_link, message } = req.body;

  try {
    if (req.user.role !== 'job_seeker') {
      return res.status(403).json({ error: 'Only job seekers can apply to jobs.' });
    }

    // Insert new application
    const { data: application, error } = await supabase
      .from('applications')
      .insert([{
        job_id,
        applicant_id: req.user.id,
        resume_link,
        message,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;

    // Get job info with employer ID and title
    const { data: job, error: jobError } = await supabase
      .from('job_postings')
      .select('employer_id, title')
      .eq('id', job_id)
      .single();

    if (jobError) throw jobError;

    // Get employer's email
    const { data: employerProfile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', job.employer_id)
      .single();

    if (profileError) throw profileError;

    const employerEmail = employerProfile.email;
    const applicantName = req.user.name;

    // Send the email
    await sendApplicationNotification(employerEmail, applicantName, job.title);

    res.status(201).json(application);
  } catch (error) {
    console.error('Application error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getApplicantsForJob = async (req, res) => {
    const jobId = req.params.jobId;
  
    try {
      if (req.user.role !== 'employer') {
        return res.status(403).json({ error: 'Only employers can view applicants.' });
      }
  
      // Check that the employer owns the job
      const { data: job, error: jobError } = await supabase
        .from('job_postings')
        .select('employer_id')
        .eq('id', jobId)
        .single();
  
      if (jobError) throw jobError;
      if (job.employer_id !== req.user.id) {
        return res.status(403).json({ error: 'You are not authorized to view applicants for this job.' });
      }
  
      // Get applicants
      const { data: applicants, error: applicantsError } = await supabase
        .from('applications')
        .select('*, profiles(name, email)')
        .eq('job_id', jobId);
  
      if (applicantsError) throw applicantsError;
  
      res.status(200).json(applicants);
    } catch (error) {
      console.error('Error fetching applicants:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  