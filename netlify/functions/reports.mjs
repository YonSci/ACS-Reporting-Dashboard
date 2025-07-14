import mongoose from 'mongoose';
import { Report } from './models/Report.mjs';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
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
    
    switch (event.httpMethod) {
      case 'GET':
        const reports = await Report.find({});
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(reports)
        };
      
      case 'POST':
        const data = JSON.parse(event.body);
        const newReport = new Report(data);
        await newReport.save();
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newReport)
        };
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ message: 'Method not allowed' })
        };
    }
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