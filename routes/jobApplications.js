const express = require('express');
const authenticate = require('../middleware/auth');
const { getJobs, createJob, updateJob, getJobById, deleteJob } = require('../controllers/jobApplicationController');
const router = express.Router();

router.use(authenticate);
router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.get('/:id', getJobById);
router.delete('/:id', deleteJob);

module.exports = router;