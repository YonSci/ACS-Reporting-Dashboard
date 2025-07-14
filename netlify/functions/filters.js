import mongoose from 'mongoose';
import { Report } from './models/Report.mjs';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    await connectToDatabase();
    
    // Get all reports to extract unique values
    const reports = await Report.find({});
    
    // Extract unique values for each filter
    const strategicResultHierarchy = {};
    const allAfricanCountries = new Set();
    const partnerships = new Set();

    reports.forEach(report => {
      // Build strategic result hierarchy
      if (report.strategicResultArea) {
        if (!strategicResultHierarchy[report.strategicResultArea]) {
          strategicResultHierarchy[report.strategicResultArea] = new Set();
        }
        if (report.subStrategicResultArea) {
          strategicResultHierarchy[report.strategicResultArea].add(report.subStrategicResultArea);
        }
      }

      // Add country
      if (report.interventionCountry) {
        allAfricanCountries.add(report.interventionCountry);
      }

      // Add partnerships
      if (Array.isArray(report.partnerships)) {
        report.partnerships.forEach(p => partnerships.add(p));
      } else if (report.partnerships) {
        partnerships.add(report.partnerships);
      }
    });

    // Convert Sets to Arrays and sort
    const filterData = {
      strategicResultHierarchy: Object.fromEntries(
        Object.entries(strategicResultHierarchy).map(([key, value]) => [key, Array.from(value).sort()])
      ),
      allAfricanCountries: Array.from(allAfricanCountries).sort(),
      partnerships: Array.from(partnerships).sort()
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(filterData)
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error.message 
      })
    };
  }
}; 