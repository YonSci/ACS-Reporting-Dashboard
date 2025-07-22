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

console.log('🚀 Real Data Migration to Appwrite');
console.log('==================================');
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('Database ID:', DATABASE_ID);
console.log('Collection ID:', REPORTS_COLLECTION_ID);
console.log('');

// Initialize Appwrite Client
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize Databases service
const databases = new Databases(client, APPWRITE_PROJECT_ID);

// Migration function
async function migrateRealData() {
    try {
        console.log('🧪 Testing connection to Appwrite...');
        
        // Test connection
        try {
            const response = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
            console.log('✅ Successfully connected to Appwrite!');
            console.log('📊 Current documents in collection:', response.documents.length);
        } catch (error) {
            if (error.code === 404) {
                console.log('❌ Collection not found. Please create the collection first.');
                return;
            } else if (error.message.includes('not authorized')) {
                console.log('❌ Permission denied. Your API key needs database permissions.');
                return;
            } else {
                console.log('❌ Connection error:', error.message);
                return;
            }
        }

        console.log('');
        console.log('📊 Starting real data migration...');
        console.log(`📝 Found ${MOCK_REPORTS.length} reports to migrate from server/data.js`);
        
        if (MOCK_REPORTS.length === 0) {
            console.log('⚠️  No reports found in MOCK_REPORTS array.');
            return;
        }
        
        let successCount = 0;
        let errorCount = 0;

        for (const report of MOCK_REPORTS) {
            try {
                console.log(`📝 Migrating report ID ${report.id}: ${report.strategicResultArea} - ${report.interventionCountry}`);
                
                // Format the data for Appwrite
                const formattedReport = {
                    strategicResultArea: report.strategicResultArea || '',
                    subStrategicResultArea: report.subStrategicResultArea || '',
                    interventionCountry: report.interventionCountry || '',
                    year: parseInt(report.year) || 2025,
                    partnerships: typeof report.partnerships === 'string' && report.partnerships
                        ? report.partnerships.split(',').map(p => p.trim()).filter(p => p)
                        : Array.isArray(report.partnerships)
                            ? report.partnerships
                            : [],
                    details: Array.isArray(report.details) 
                        ? report.details 
                        : typeof report.details === 'string'
                            ? [report.details]
                            : [],
                    sdgContribution: report.sdgContribution || '',
                    supportingLinks: Array.isArray(report.supportingLinks) 
                        ? report.supportingLinks 
                        : typeof report.supportingLinks === 'string'
                            ? [report.supportingLinks]
                            : [],
                    status: "approved", // Default status for migrated data
                    createdBy: "system",
                    createdByUsername: "System Migration",
                    approvedBy: "system",
                    approvedByUsername: "System Migration"
                };

                // Create document in Appwrite
                const result = await databases.createDocument(
                    DATABASE_ID,
                    REPORTS_COLLECTION_ID,
                    'unique()',
                    formattedReport
                );

                console.log(`✅ Successfully created document: ${result.$id}`);
                successCount++;
                
            } catch (error) {
                console.log(`❌ Error migrating report ID ${report.id}: ${error.message}`);
                errorCount++;
            }
        }

        console.log('');
        console.log('🎉 Real data migration completed!');
        console.log(`✅ Successfully migrated: ${successCount} reports`);
        console.log(`❌ Failed migrations: ${errorCount} reports`);
        console.log(`📊 Total processed: ${MOCK_REPORTS.length} reports`);
        
        if (successCount > 0) {
            console.log('');
            console.log('🚀 Your real data is now in Appwrite!');
            console.log('Your dashboard will now show your actual reports from server/data.js');
            console.log('');
            console.log('📋 Data Summary:');
            console.log(`- Total reports migrated: ${successCount}`);
            console.log(`- Countries covered: ${new Set(MOCK_REPORTS.map(r => r.interventionCountry)).size}`);
            console.log(`- Strategic areas: ${new Set(MOCK_REPORTS.map(r => r.strategicResultArea).filter(r => r)).size}`);
        }

    } catch (error) {
        console.error('❌ Migration failed:', error);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Make sure server/data.js exists and exports MOCK_REPORTS');
        console.log('2. Check that all required attributes are added to the collection');
        console.log('3. Verify your API key has the correct permissions');
    }
}

// Run migration
migrateRealData(); 