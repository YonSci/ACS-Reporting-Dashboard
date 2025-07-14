import mongoose from 'mongoose';
import { MOCK_REPORTS } from '../data.js';

const connectDB = async () => {
  try {
    // Try to get MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/acs-reporting';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log('MongoDB Connected Successfully');
    
    // Check if we need to seed initial data
    const Report = mongoose.model('Report');
    const count = await Report.countDocuments();
    if (count === 0) {
      console.log('Seeding initial data...');
      // Format the mock data to match the schema
      const formattedReports = MOCK_REPORTS.map(report => ({
        ...report,
        partnerships: typeof report.partnerships === 'string' 
          ? report.partnerships.split(',').map(p => p.trim())
          : Array.isArray(report.partnerships) 
            ? report.partnerships
            : [],
        details: Array.isArray(report.details) 
          ? report.details 
          : typeof report.details === 'string'
            ? [report.details]
            : []
      }));
      await Report.insertMany(formattedReports);
      console.log('Initial data seeded successfully');
    }

  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.log('Falling back to mock data...');
    return false;
  }
  return true;
};

export default connectDB; 