const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v2: cloudinary } = require('cloudinary');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Create uploads directory for temporary storage
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with project ID if available
    const projectId = req.body.projectId || 'temp';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `project-${projectId}-${uniqueSuffix}${ext}`);
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
    fileSize: 10 * 1024 * 1024, // 10MB limit (Cloudinary supports larger files)
    files: 1 // Single file upload for projects
  }
});

// @route   POST /api/upload/image
// @desc    Upload image files to Cloudinary
// @access  Public (for testing - remove auth for now)
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded'
      });
    }

    console.log('Uploading to Cloudinary:', req.file.filename);

    // Upload to Cloudinary with optimization
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/projects',
      public_id: `project-${Date.now()}`,
      transformation: [
        { width: 800, height: 600, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
      resource_type: 'auto'
    });

    // Delete temporary local file
    fs.unlinkSync(req.file.path);

    console.log('Cloudinary upload successful:', result.secure_url);

    res.json({
      status: 'success',
      message: 'Image uploaded successfully to Cloudinary',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
        uploadedAt: new Date()
      }
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Clean up temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Image upload failed: ' + error.message
    });
  }
});

// @route   DELETE /api/upload/image/:publicId
// @desc    Delete image from Cloudinary
// @access  Private (Admin only)
router.delete('/image/:publicId', auth, adminOnly, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    console.log('Deleting from Cloudinary:', publicId);

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({
        status: 'success',
        message: 'Image deleted successfully from Cloudinary'
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Image not found in Cloudinary'
      });
    }

  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Image deletion failed: ' + error.message
    });
  }
});

// @route   GET /api/upload/images
// @desc    Get list of uploaded images from Cloudinary
// @access  Private (Admin only)
router.get('/images', auth, adminOnly, async (req, res) => {
  try {
    // Get images from Cloudinary
    const result = await cloudinary.search
      .expression('folder:portfolio/projects')
      .sort_by([['created_at', 'desc']])
      .max_results(50)
      .execute();

    const images = result.resources.map(resource => ({
      publicId: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      size: resource.bytes,
      uploadedAt: resource.created_at
    }));

    res.json({
      status: 'success',
      data: {
        images: images,
        count: images.length
      }
    });

  } catch (error) {
    console.error('Cloudinary search error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch images from Cloudinary'
    });
  }
});

// @route   POST /api/upload/transform
// @desc    Get transformed image URL from Cloudinary
// @access  Public (for frontend image optimization)
router.post('/transform', async (req, res) => {
  try {
    const { publicId, transformations } = req.body;
    
    if (!publicId) {
      return res.status(400).json({
        status: 'error',
        message: 'Public ID is required'
      });
    }

    // Generate transformed URL
    const transformedUrl = cloudinary.url(publicId, {
      ...transformations,
      secure: true
    });

    res.json({
      status: 'success',
      data: {
        url: transformedUrl
      }
    });

  } catch (error) {
    console.error('Cloudinary transform error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Image transformation failed'
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
