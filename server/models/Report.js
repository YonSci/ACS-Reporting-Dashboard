const mongoose = require('mongoose');

// Update the schema to include fields from MOCK_REPORTS
const reportSchema = new mongoose.Schema({
  id: { type: String },
  strategicResultArea: { type: String },
  subStrategicResultArea: { type: String },
  interventionCountry: { type: String },
  partnerships: { type: [String] }, // Update the `partnerships` field to accept an array of strings
  year: { type: Number },
  sdgContribution: { type: String },
  supportingLinks: { type: String },
  details: { type: [String] },
  createdAt: { type: Date, default: Date.now },
});

// Create the model for a report
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
