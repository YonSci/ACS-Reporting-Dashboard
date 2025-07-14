import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  strategicResultArea: {
    type: String,
    required: true
  },
  subStrategicResultArea: String,
  interventionCountry: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  partnerships: {
    type: [String],
    default: []
  },
  details: {
    type: [String],
    default: []
  },
  sdgContribution: String,
  supportingLinks: String,
  status: {
    type: String,
    enum: ['completed', 'in progress', 'pending'],
    default: 'pending'
  }
});

// Prevent mongoose from creating a new model if it already exists
export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema); 