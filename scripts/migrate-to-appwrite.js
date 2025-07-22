import { Client, Databases } from 'appwrite';
import { MOCK_REPORTS } from '../server/data.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

// Initialize Appwrite Client
const client = new Client();

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// For Appwrite v18+, we need to pass the API key to the Databases constructor
const databases = new Databases(client, APPWRITE_PROJECT_ID);

// Create a simple test to check if the connection works
console.log('🔗 Testing Appwrite connection...');
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('API Key length:', APPWRITE_API_KEY ? APPWRITE_API_KEY.length : 'Not set');

// Migration function
async function migrateToAppwrite() {
    console.log('🚀 Starting migration to Appwrite...');
    
    try {
        // Test basic connection first
        console.log('🧪 Testing basic connection...');
        
        // For now, let's just test if we can list databases
        try {
            const dbList = await databases.list();
            console.log('✅ Successfully connected to Appwrite!');
            console.log('📊 Found databases:', dbList.databases.length);
            
            // Check if our database exists
            const existingDb = dbList.databases.find(db => db.$id === DATABASE_ID);
            if (existingDb) {
                console.log('✅ Database already exists:', existingDb.name);
            } else {
                console.log('📦 Database does not exist, will create it...');
            }
        } catch (error) {
            console.log('❌ Connection test failed:', error.message);
            throw error;
        }

        // Check if collection exists, if not create it
        try {
            await databases.getCollection(DATABASE_ID, REPORTS_COLLECTION_ID);
            console.log('✅ Collection exists');
        } catch (error) {
            console.log('📋 Creating collection...');
            await databases.createCollection(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                'Reports',
                [
                    // Required attributes
                    {
                        key: 'strategicResultArea',
                        type: 'string',
                        required: true
                    },
                    {
                        key: 'interventionCountry',
                        type: 'string',
                        required: true
                    },
                    {
                        key: 'year',
                        type: 'integer',
                        required: true
                    },
                    {
                        key: 'status',
                        type: 'string',
                        required: true,
                        default: 'draft'
                    },
                    {
                        key: 'createdBy',
                        type: 'string',
                        required: true
                    },
                    {
                        key: 'createdByUsername',
                        type: 'string',
                        required: true
                    },
                    // Optional attributes
                    {
                        key: 'subStrategicResultArea',
                        type: 'string',
                        required: false
                    },
                    {
                        key: 'partnerships',
                        type: 'string[]',
                        required: false
                    },
                    {
                        key: 'details',
                        type: 'string[]',
                        required: false
                    },
                    {
                        key: 'approvedBy',
                        type: 'string',
                        required: false
                    },
                    {
                        key: 'approvedByUsername',
                        type: 'string',
                        required: false
                    },
                    {
                        key: 'adminNotes',
                        type: 'string',
                        required: false
                    },
                    {
                        key: 'sdgContribution',
                        type: 'string',
                        required: false
                    },
                    {
                        key: 'supportingLinks',
                        type: 'string[]',
                        required: false
                    }
                ]
            );

            // Create indexes
            await databases.createIndex(DATABASE_ID, REPORTS_COLLECTION_ID, 'status_index', 'key', ['status']);
            await databases.createIndex(DATABASE_ID, REPORTS_COLLECTION_ID, 'country_index', 'key', ['interventionCountry']);
            await databases.createIndex(DATABASE_ID, REPORTS_COLLECTION_ID, 'created_by_index', 'key', ['createdBy']);
        }

        // Migrate mock data
        console.log(`📊 Migrating ${MOCK_REPORTS.length} reports...`);
        
        let successCount = 0;
        let errorCount = 0;

        for (const report of MOCK_REPORTS) {
            try {
                // Format the data for Appwrite
                const formattedReport = {
                    strategicResultArea: report.strategicResultArea,
                    subStrategicResultArea: report.subStrategicResultArea || '',
                    interventionCountry: report.interventionCountry,
                    year: parseInt(report.year) || 2024,
                    partnerships: Array.isArray(report.partnerships) 
                        ? report.partnerships 
                        : typeof report.partnerships === 'string'
                            ? report.partnerships.split(',').map(p => p.trim())
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
                    status: 'approved', // Set all mock data as approved
                    createdBy: 'system',
                    createdByUsername: 'System Migration',
                    createdAt: new Date().toISOString()
                };

                await databases.createDocument(
                    DATABASE_ID,
                    REPORTS_COLLECTION_ID,
                    'unique()',
                    formattedReport
                );

                successCount++;
                if (successCount % 10 === 0) {
                    console.log(`✅ Migrated ${successCount} reports...`);
                }
            } catch (error) {
                console.error(`❌ Error migrating report:`, error.message);
                errorCount++;
            }
        }

        console.log('\n🎉 Migration completed!');
        console.log(`✅ Successfully migrated: ${successCount} reports`);
        console.log(`❌ Failed migrations: ${errorCount} reports`);
        console.log(`📊 Total processed: ${MOCK_REPORTS.length} reports`);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateToAppwrite(); 