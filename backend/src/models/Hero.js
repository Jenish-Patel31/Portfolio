const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  title: {
    type: String,
    required: [true, 'Professional title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  summary: {
    type: String,
    required: [true, 'Professional summary is required'],
    trim: true,
    maxlength: [1000, 'Summary cannot exceed 1000 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  socialLinks: {
    github: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please enter a valid URL'
      }
    },
    linkedin: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please enter a valid URL'
      }
    },
    leetcode: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please enter a valid URL'
      }
    },
    portfolio: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Please enter a valid URL'
      }
    }
  },
  profileImage: {
    type: String,
    trim: true
  },
  resumeUrl: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Ensure only one hero record exists
heroSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } });

module.exports = mongoose.model('Hero', heroSchema);
