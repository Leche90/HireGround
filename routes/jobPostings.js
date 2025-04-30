const express = require('express');
const authenticate = require('../middleware/auth');
const allowRoles = require('../middleware/role');

const {
  getAllJobPostings,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingById
} = require('../controllers/jobPostingController');

const router = express.Router();

// Authenticate all requests
router.use(authenticate);

// Public routes (authenticated users can view)
router.get('/', getAllJobPostings);
router.get('/:id', getJobPostingById);

// Employer-only routes
router.post('/', allowRoles('employer'), createJobPosting);
router.put('/:id', allowRoles('employer'), updateJobPosting);
router.delete('/:id', allowRoles('employer'), deleteJobPosting);

module.exports = router;
