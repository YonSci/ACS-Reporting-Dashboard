import { Client, Databases } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

console.log('🔍 Checking Appwrite Database');
console.log('============================');
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

// Check function
async function checkAppwriteData() {
    try {
        console.log('🧪 Testing connection to Appwrite...');
        
        // Get all documents with pagination
        let allDocuments = [];
        let offset = 0;
        const limit = 100;
        
        while (true) {
            console.log(`🔄 Fetching documents: offset=${offset}, limit=${limit}`);
            const response = await databases.listDocuments(
                DATABASE_ID,
                REPORTS_COLLECTION_ID,
                [], // queries
                limit, // limit
                offset // offset
            );
            
            console.log(`📄 Received ${response.documents.length} documents in this batch`);
            console.log(`📊 Total documents in response: ${response.total || 'unknown'}`);
            allDocuments = allDocuments.concat(response.documents);
            console.log(`📈 Total documents collected so far: ${allDocuments.length}`);
            
            if (response.documents.length < limit) {
                console.log(`🏁 Reached end: got ${response.documents.length} < ${limit}`);
                break;
            }
            
            console.log(`➡️ Continuing to next batch: offset=${offset} -> ${offset + limit}`);
            offset += limit;
        }
        
        console.log('✅ Successfully connected to Appwrite!');
        console.log(`📊 Total documents in collection: ${allDocuments.length}`);
        
        // Check for Ethiopia reports
        const ethiopiaReports = allDocuments.filter(doc => doc.interventionCountry === 'Ethiopia');
        console.log(`🇪🇹 Ethiopia reports found: ${ethiopiaReports.length}`);
        
        // Show unique countries
        const uniqueCountries = [...new Set(allDocuments.map(doc => doc.interventionCountry))].sort();
        console.log(`🌍 Unique countries: ${uniqueCountries.length}`);
        console.log('Countries:', uniqueCountries);
        
        // Show sample document structure
        if (allDocuments.length > 0) {
            console.log('\n📋 Sample document structure:');
            console.log(Object.keys(allDocuments[0]));
        }
        
    } catch (error) {
        console.error('❌ Error checking Appwrite data:', error);
    }
}

// Run check
checkAppwriteData(); 