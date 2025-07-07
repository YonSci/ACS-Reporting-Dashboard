const mongoose = require('mongoose');
const Report = require('./models/Report.cjs');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Sample data for initial testing
const sampleReports = [
  {
    id: '1',
    title: 'Economic Development Report 2023',
    description: 'Annual report on economic development initiatives in Africa',
    date: new Date('2023-12-01'),
    strategicResultArea: 'Economic Development',
    subStrategicResultArea: 'Trade and Industry',
    interventionCountry: 'Kenya',
    partnerships: ['Government Agencies', 'Private Sector'],
    status: 'Published',
    priority: 'High',
    progress: 100
  },
  {
    id: '2',
    title: 'Healthcare Infrastructure Project',
    description: 'Assessment of healthcare infrastructure development in East Africa',
    date: new Date('2023-11-15'),
    strategicResultArea: 'Social Development',
    subStrategicResultArea: 'Healthcare',
    interventionCountry: 'Tanzania',
    partnerships: ['International Organizations', 'NGOs'],
    status: 'In Progress',
    priority: 'Medium',
    progress: 60
  }
];

const mongoUri = process.env.MONGO_URI;
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

exports.handler = async (event) => {
  console.log('Function invoked with method:', event.httpMethod);

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    // If MongoDB is not configured, return sample data
    if (!mongoUri) {
      console.log('No MongoDB URI configured, returning sample data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(sampleReports)
      };
    }

    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const reports = await Report.find();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(reports || [])
      };
    }

    if (event.httpMethod === 'POST') {
      try {
        const data = JSON.parse(event.body);
        const newReport = new Report(data);
        const savedReport = await newReport.save();
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(savedReport)
        };
      } catch (parseError) {
        console.error('Error parsing request body:', parseError);
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid request body',
            message: parseError.message
          })
        };
      }
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
