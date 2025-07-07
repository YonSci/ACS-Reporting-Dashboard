import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  strategicResultArea: { type: String },
  subStrategicResultArea: { type: String },
  interventionCountry: { type: String },
  partnerships: { type: [String] },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
