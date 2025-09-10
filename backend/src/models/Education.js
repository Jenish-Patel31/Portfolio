const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'Institution name is required'],
    trim: true,
    maxlength: [200, 'Institution name cannot exceed 200 characters']
  },
  degree: {
    type: String,
    required: [true, 'Degree is required'],
    trim: true,
    maxlength: [200, 'Degree cannot exceed 200 characters']
  },
  field: {
    type: String,
    required: [true, 'Field of study is required'],
    trim: true,
    maxlength: [200, 'Field cannot exceed 200 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be negative'],
    max: [10, 'GPA cannot exceed 10']
  },
  percentage: {
    type: Number,
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  logo: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  achievements: [{
    type: String,
    trim: true,
    maxlength: [300, 'Achievement cannot exceed 300 characters']
  }],
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
educationSchema.index({ order: 1, endDate: -1, isActive: 1 });

// Virtual for duration
educationSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return `${diffYears} years`;
});

// Ensure virtuals are serialized
educationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Education', educationSchema);
