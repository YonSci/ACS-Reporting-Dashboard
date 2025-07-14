import mongoose from 'mongoose';
import { Report } from './models/Report.mjs';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    if (mongoose.connection.readyState === 0) {
      const db = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      });
      
      console.log('MongoDB connected successfully');
      cachedDb = db;
      return db;
    } else {
      return mongoose.connection;
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error(`Database connection failed: ${error.message}`);
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
    console.log('Connecting to database...');
    await connectToDatabase();
    console.log('Database connected, processing request...');
    
    // Get all reports to extract unique values
    const reports = await Report.find({}).lean();
    console.log(`Found ${reports.length} reports for filter extraction`);
    
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

    console.log('Successfully processed filters');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(filterData)
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Handle specific types of errors
    if (error.message.includes('MONGODB_URI')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: 'Database configuration error',
          error: 'Missing database connection string'
        })
      };
    }
    
    if (error.name === 'MongooseServerSelectionError') {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: 'Database connection error',
          error: 'Could not connect to database server'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error.message 
      })
    };
  } finally {
    // If we're not caching the connection, close it
    if (!cachedDb && mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Database connection closed');
    }
  }
}; 