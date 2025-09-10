const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Configure upload limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files per request
  }
});

// @route   POST /api/upload/image
// @desc    Upload image files
// @access  Private (Admin only)
router.post('/image', auth, adminOnly, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No files uploaded'
      });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      uploadedAt: new Date()
    }));

    res.json({
      status: 'success',
      message: 'Files uploaded successfully',
      data: {
        files: uploadedFiles,
        count: uploadedFiles.length
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: 'error',
          message: 'File size too large. Maximum size is 5MB.'
        });
      }
      if (error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          status: 'error',
          message: 'Too many files. Maximum 5 files allowed.'
        });
      }
    }

    res.status(500).json({
      status: 'error',
      message: 'File upload failed'
    });
  }
});

// @route   DELETE /api/upload/image/:filename
// @desc    Delete uploaded image
// @access  Private (Admin only)
router.delete('/image/:filename', auth, adminOnly, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'File not found'
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    res.json({
      status: 'success',
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'File deletion failed'
    });
  }
});

// @route   GET /api/upload/images
// @desc    Get list of uploaded images
// @access  Private (Admin only)
router.get('/images', auth, adminOnly, async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        return {
          filename: file,
          url: `/uploads/${file}`,
          size: stats.size,
          uploadedAt: stats.birthtime
        };
      })
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    res.json({
      status: 'success',
      data: {
        images: imageFiles,
        count: imageFiles.length
      }
    });

  } catch (error) {
    console.error('Image list fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch image list'
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      message: `Upload error: ${error.message}`
    });
  }
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
  
  next();
});

module.exports = router;
