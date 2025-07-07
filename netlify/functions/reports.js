const mongoose = require('mongoose');
const Report = require('./models/Report.mjs').default; // Access the default export

const mongoUri = process.env.MONGO_URI;

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(mongoUri); // Removed deprecated options
    isConnected = true;
  }
};

exports.handler = async (event, context) => {
  // Add debug logs to identify issues
  console.log('Event:', event);
  console.log('Context:', context);
  console.log('Imported Report model:', Report); // Debug log to verify the Report model

  try {
    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const reports = await Report.find();
      // Add debug logs to verify the result of Report.find()
      console.log('Reports:', reports);
      // Add CORS headers to the response
      console.log('Response being sent:', {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Replace '*' with your Netlify domain for better security
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(reports),
      });
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Replace '*' with your Netlify domain for better security
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(reports),
      };
    }

    if (event.httpMethod === 'POST') {
      const newReport = new Report(JSON.parse(event.body));
      const savedReport = await newReport.save();
      return {
        statusCode: 201,
        body: JSON.stringify(savedReport),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
