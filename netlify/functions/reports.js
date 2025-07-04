const mongoose = require('mongoose');
const Report = require('../../server/models/Report');

const mongoUri = process.env.MONGO_URI;

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  }
};

exports.handler = async (event, context) => {
  try {
    await connectToDatabase();

    if (event.httpMethod === 'GET') {
      const reports = await Report.find();
      return {
        statusCode: 200,
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
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
