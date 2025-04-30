const express = require('express');
const authenticate = require('../middleware/auth');
const {
  applyToJob,
  getApplicantsForJob
} = require('../controllers/applicationController');

const router = express.Router();

router.use(authenticate);

// Job seekers apply to jobs
router.post('/', applyToJob);

// Employers view applicants for a specific job
router.get('/:jobId', getApplicantsForJob);

module.exports = router;
