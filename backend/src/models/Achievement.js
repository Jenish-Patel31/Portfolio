const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Achievement category is required'],
    enum: ['academic', 'hackathon', 'competition', 'certification', 'publication', 'leadership', 'other'],
    default: 'other'
  },
  date: {
    type: Date,
    required: [true, 'Achievement date is required']
  },
  icon: {
    type: String,
    trim: true
  },
  badge: {
    type: String,
    trim: true
  },
  prize: {
    amount: {
      type: Number,
      min: [0, 'Prize amount cannot be negative']
    },
    currency: {
      type: String,
      trim: true,
      default: 'INR'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Prize description cannot exceed 200 characters']
    }
  },
  organization: {
    type: String,
    trim: true,
    maxlength: [200, 'Organization name cannot exceed 200 characters']
  },
  participants: {
    type: Number,
    min: [1, 'Number of participants must be at least 1']
  },
  rank: {
    type: Number,
    min: [1, 'Rank must be at least 1']
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
achievementSchema.index({ category: 1, date: -1, order: 1, isActive: 1 });

module.exports = mongoose.model('Achievement', achievementSchema);
