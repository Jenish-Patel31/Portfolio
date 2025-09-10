const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'Leadership role is required'],
    trim: true,
    maxlength: [200, 'Role cannot exceed 200 characters']
  },
  organization: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
    maxlength: [200, 'Organization name cannot exceed 200 characters']
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
    required: [true, 'Role description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  keyContributions: [{
    type: String,
    trim: true,
    maxlength: [300, 'Contribution cannot exceed 300 characters']
  }],
  teamSize: {
    type: Number,
    min: [1, 'Team size must be at least 1'],
    default: 1
  },
  impact: {
    type: String,
    trim: true,
    maxlength: [500, 'Impact description cannot exceed 500 characters']
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  logo: {
    type: String,
    trim: true
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
leadershipSchema.index({ order: 1, startDate: -1, isActive: 1 });

// Virtual for duration
leadershipSchema.virtual('duration').get(function() {
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
leadershipSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Leadership', leadershipSchema);
