import mongoose from 'mongoose';
import { Report } from './models/Report.mjs';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
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
  // Set to false to prevent function timeout issues
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
    
    switch (event.httpMethod) {
      case 'GET':
        try {
          const reports = await Report.find({}).lean();
          console.log(`Found ${reports.length} reports`);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(reports)
          };
        } catch (error) {
          console.error('Error fetching reports:', error);
          throw new Error(`Failed to fetch reports: ${error.message}`);
        }
      
      case 'POST':
        try {
          const data = JSON.parse(event.body);
          const newReport = new Report(data);
          const savedReport = await newReport.save();
          console.log('New report created:', savedReport._id);
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify(savedReport)
          };
        } catch (error) {
          console.error('Error creating report:', error);
          throw new Error(`Failed to create report: ${error.message}`);
        }
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
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