const express = require('express');
const multer = require('multer');
const router = express.Router();
const { saveFileMetadata } = require('../controllers/fileController');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST route for file upload
router.post('/', upload.single('file'), saveFileMetadata);

module.exports = router;
