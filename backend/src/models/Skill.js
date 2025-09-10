const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'devops', 'tools', 'languages', 'databases', 'cloud', 'ai', 'blockchain', 'emerging'],
    trim: true
  },
  skills: [{
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [100, 'Skill name cannot exceed 100 characters']
    },
    icon: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      trim: true,
      default: '#3b82f6'
    },
    yearsOfExperience: {
      type: Number,
      min: [0, 'Years of experience cannot be negative'],
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
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
skillSchema.index({ category: 1, order: 1, isActive: 1 });

// Ensure unique categories
skillSchema.index({ category: 1 }, { unique: true });

module.exports = mongoose.model('Skill', skillSchema);
