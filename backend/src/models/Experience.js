const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
    maxlength: [200, 'Position cannot exceed 200 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (this.current) return true;
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  achievements: [{
    type: String,
    trim: true,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
  technologies: [{
    type: String,
    trim: true,
    maxlength: [50, 'Technology name cannot exceed 50 characters']
  }],
  companyLogo: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
experienceSchema.index({ order: 1, startDate: -1, isActive: 1 });

// Virtual for duration
experienceSchema.virtual('duration').get(function() {
  if (this.current) {
    const now = new Date();
    const diffTime = Math.abs(now - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  }
  
  if (this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  }
  
  return 'N/A';
});

// Ensure virtuals are serialized
experienceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Experience', experienceSchema);
