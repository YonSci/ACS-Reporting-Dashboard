import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MOCK_REPORTS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from './data.js';
import { reportsAPI } from './config/appwrite.js';

// Load environment variables before any other code
dotenv.config({ override: true });

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS to allow both development ports
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'production') {
      callback(null, process.env.ALLOWED_ORIGIN);
    } else if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true // Allow credentials
}));

app.use(express.json());

// Track Appwrite connection status
let isAppwriteConnected = false;

// Initialize Appwrite connection
(async () => {
  try {
    // Test Appwrite connection by getting reports
    await reportsAPI.getAllReports();
    isAppwriteConnected = true;
    console.log('Appwrite Connected Successfully');
  } catch (error) {
    console.log('Appwrite Connection Error:', error.message);
    console.log('Falling back to mock data...');
  }
})();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the ACS Reporting Dashboard API!',
    status: 'healthy',
    dbConnected: isAppwriteConnected
  });
});

app.get('/api/reports', async (req, res) => {
  try {
    if (isAppwriteConnected) {
      const reports = await reportsAPI.getAllReports();
      res.json(reports);
    } else {
      // Fallback to mock data
      console.log('Using mock data for reports (Appwrite not connected)');
      res.json(MOCK_REPORTS);
    }
  } catch (error) {
    console.error('Error fetching reports:', error);
    // Fallback to mock data on error
    res.json(MOCK_REPORTS);
  }
});

app.get('/api/filters', (req, res) => {
  res.json({
    strategicResultHierarchy: STRATEGIC_RESULTS_HIERARCHY,
    allAfricanCountries: ALL_AFRICAN_COUNTRIES,
    partnerships: PARTNERSHIPS,
  });
});

app.post('/api/reports', async (req, res) => {
  try {
    if (isAppwriteConnected) {
      const savedReport = await reportsAPI.createReport(req.body);
      res.status(201).json(savedReport);
    } else {
      // Fallback to mock data behavior
      const newReport = req.body;
      newReport.id = String(MOCK_REPORTS.length > 0 ? Math.max(...MOCK_REPORTS.map(r => parseInt(r.id))) + 1 : 0);
      MOCK_REPORTS.push(newReport);
      res.status(201).json(newReport);
    }
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ 
      error: 'Failed to create report',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
