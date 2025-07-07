const mongoose = require('mongoose');
const Report = require('./models/Report.mjs'); // Updated to point to the local copy

const mongoUri = process.env.MONGO_URI;

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(mongoUri); // Removed deprecated options
    isConnected = true;
  }
};

exports.handler = async (event, context) => {
  console.log('Event:', event);
  console.log('Context:', context);

  try {
    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const reports = await Report.find();
      console.log('Reports:', reports);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://acs-reporting-dashboard.netlify.app',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reports || []),
      };
    }

    if (event.httpMethod === 'POST') {
      const newReport = new Report(JSON.parse(event.body));
      const savedReport = await newReport.save();
      return {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedReport),
      };
    }

    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
