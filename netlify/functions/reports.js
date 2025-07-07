const mongoose = require('mongoose');
const Report = require('./models/Report.cjs');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI environment variable is not set');
}

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoUri);
      isConnected = true;
      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    if (!mongoUri) {
      throw new Error('MongoDB connection string is not configured');
    }

    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const reports = await Report.find();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(reports)
      };
    }

    if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      const newReport = new Report(data);
      const savedReport = await newReport.save();
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(savedReport)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Function error:', error);
    
    // Return a proper JSON response even for errors
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};
