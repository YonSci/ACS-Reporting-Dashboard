import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  strategicResultArea: {
    type: String,
    required: false
  },
  subStrategicResultArea: {
    type: String,
    required: false
  },
  interventionCountry: {
    type: String,
    required: true
  },
  partnerships: {
    type: [String], // Changed to array of strings
    required: false,
    default: []
  },
  year: {
    type: Number,
    required: false
  },
  sdgContribution: {
    type: String,
    required: false
  },
  supportingLinks: {
    type: String,
    required: false
  },
  details: {
    type: [String], // Changed to array of strings
    required: false,
    default: []
  }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report; 