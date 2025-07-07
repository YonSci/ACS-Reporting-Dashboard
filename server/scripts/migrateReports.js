import mongoose from 'mongoose';
import { MOCK_REPORTS } from '../data.js';
import Report from '../models/Report.js';
import dotenv from 'dotenv';

// Explicitly specify the path to the .env file
dotenv.config({ path: './server/.env' });

// Debug statement to verify dotenv configuration
console.log('dotenv loaded:', dotenv.config());
console.log('MONGO_URI:', process.env.MONGO_URI);

// Ensure MOCK_REPORTS matches the Report schema
const sanitizedReports = MOCK_REPORTS.map(report => ({
  title: report.title || 'Untitled Report',
  description: report.description || 'No description provided',
  createdAt: report.createdAt || new Date(),
  ...report, // Include other fields as is
}));

const migrateReports = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert sanitized reports into MongoDB
    const insertedReports = await Report.insertMany(sanitizedReports);
    console.log('Inserted Reports:', insertedReports);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error migrating reports:', err);
  }
};

migrateReports();
