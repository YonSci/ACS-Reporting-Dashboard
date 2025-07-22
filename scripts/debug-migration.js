import { Client, Databases } from 'appwrite';
import dotenv from 'dotenv';
import { MOCK_REPORTS } from '../server/data.js';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

console.log('🔍 Debug Migration Process');
console.log('=========================');
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('Database ID:', DATABASE_ID);
console.log('Collection ID:', REPORTS_COLLECTION_ID);
console.log('API Key length:', APPWRITE_API_KEY ? APPWRITE_API_KEY.length : 'NOT SET');
console.log('');

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize Databases service
const databases = new Databases(client, APPWRITE_PROJECT_ID);

// Debug function
async function debugMigration() {
    try {
        console.log('🧪 Testing connection to Appwrite...');
        
        // Test connection
        const response = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
        console.log('✅ Successfully connected to Appwrite!');
        console.log(`📊 Current documents in collection: ${response.documents.length}`);
        
        // Try to create a single test document
        console.log('');
        console.log('🧪 Testing document creation...');
        
        const testReport = {
            strategicResultArea: 'Test Area',
            subStrategicResultArea: 'Test Sub Area',
            interventionCountry: 'Test Country',
            year: 2025,
            partnerships: ['Test Partnership'],
            details: ['Test detail'],
            sdgContribution: 'Test SDG',
            supportingLinks: ['https://test.com'],
            status: "approved",
            createdBy: "system",
            createdByUsername: "System Migration",
            approvedBy: "system",
            approvedByUsername: "System Migration"
        };

        const result = await databases.createDocument(
            DATABASE_ID,
            REPORTS_COLLECTION_ID,
            'unique()',
            testReport
        );

        console.log(`✅ Successfully created test document: ${result.$id}`);
        
        // Check if the document was actually created
        console.log('');
        console.log('🧪 Verifying document creation...');
        const verifyResponse = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
        console.log(`📊 Documents after creation: ${verifyResponse.documents.length}`);
        
        // Delete the test document
        await databases.deleteDocument(DATABASE_ID, REPORTS_COLLECTION_ID, result.$id);
        console.log(`🗑️ Deleted test document: ${result.$id}`);
        
        // Final check
        const finalResponse = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
        console.log(`📊 Final document count: ${finalResponse.documents.length}`);
        
    } catch (error) {
        console.error('❌ Debug failed:', error);
        console.log('Error details:', error.message);
        console.log('Error code:', error.code);
    }
}

// Run debug
debugMigration(); 