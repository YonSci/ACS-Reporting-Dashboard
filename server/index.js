import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {MOCK_REPORTS, STRATEGIC_RESULTS_HIERARCHY, ALL_AFRICAN_COUNTRIES, PARTNERSHIPS } from './data.js';
import dotenv from 'dotenv';
import Report from './models/Report.js';
dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://yonasmersha14:YMlyRM0wcEWPY9jg@acs-reporting.cxiacp4.mongodb.net/acs_reporting?retryWrites=true&w=majority';

mongoose.connect(mongoUri)

.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the ACS Reporting Dashboard API!');
});

// Update GET /api/reports to fetch reports from MongoDB
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all reports from MongoDB
    res.json(reports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

app.get('/api/filters', (req, res) => {
  res.json({
    strategicResultHierarchy: STRATEGIC_RESULTS_HIERARCHY,
    allAfricanCountries: ALL_AFRICAN_COUNTRIES,
    partnerships: PARTNERSHIPS,
  });
});

// Update POST /api/reports to save a new report to MongoDB
app.post('/api/reports', async (req, res) => {
  try {
    const newReport = new Report(req.body); // Create a new report instance
    const savedReport = await newReport.save(); // Save the report to the database
    res.status(201).json(savedReport); // Return the saved report
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
