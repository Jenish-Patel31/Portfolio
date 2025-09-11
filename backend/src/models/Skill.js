const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
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
    proficiency: {
      type: Number,
      required: [true, 'Skill proficiency level is required'],
      min: [0, 'Proficiency cannot be less than 0'],
      max: [100, 'Proficiency cannot be more than 100'],
      default: 70
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
