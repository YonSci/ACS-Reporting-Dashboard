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

console.log('🔗 Appwrite Configuration Test');
console.log('==============================');
console.log('Endpoint:', APPWRITE_ENDPOINT);
console.log('Project ID:', APPWRITE_PROJECT_ID);
console.log('API Key:', APPWRITE_API_KEY ? '✅ Set (' + APPWRITE_API_KEY.length + ' chars)' : '❌ Not set');
console.log('Database ID:', DATABASE_ID);
console.log('Collection ID:', REPORTS_COLLECTION_ID);
console.log('');

// Initialize Appwrite Client
const client = new Client();

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

console.log('✅ Appwrite client initialized');
console.log('');

// Test connection
async function testConnection() {
    try {
        console.log('🧪 Testing Appwrite connection...');
        
        // Create a simple HTTP request to test the connection
        const response = await fetch(`${APPWRITE_ENDPOINT}/databases`, {
            method: 'GET',
            headers: {
                'X-Appwrite-Project': APPWRITE_PROJECT_ID,
                'X-Appwrite-Key': APPWRITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Successfully connected to Appwrite!');
            console.log('📊 Found databases:', data.databases ? data.databases.length : 'Unknown');
            
            if (data.databases) {
                data.databases.forEach(db => {
                    console.log(`   - ${db.name} (${db.$id})`);
                });
            }
        } else {
            console.log('❌ Connection failed:', response.status, response.statusText);
            const errorText = await response.text();
            console.log('Error details:', errorText);
        }
    } catch (error) {
        console.log('❌ Connection error:', error.message);
    }
}

// Manual setup instructions
function showSetupInstructions() {
    console.log('');
    console.log('📋 Manual Setup Instructions');
    console.log('============================');
    console.log('');
    console.log('1. Go to your Appwrite Console: https://cloud.appwrite.io');
    console.log('2. Select your project:', APPWRITE_PROJECT_ID);
    console.log('3. Go to "Databases" in the left sidebar');
    console.log('4. Click "Create Database"');
    console.log('   - Name: ACS Dashboard');
    console.log('   - Database ID:', DATABASE_ID);
    console.log('');
    console.log('5. Click "Create Collection"');
    console.log('   - Name: Reports');
    console.log('   - Collection ID:', REPORTS_COLLECTION_ID);
    console.log('   - Permissions: Read/Write for all users');
    console.log('');
    console.log('6. Add these attributes to the collection:');
    console.log('   - strategicResultArea (string, required)');
    console.log('   - subStrategicResultArea (string, optional)');
    console.log('   - interventionCountry (string, required)');
    console.log('   - year (integer, required)');
    console.log('   - partnerships (string[], optional)');
    console.log('   - details (string[], optional)');
    console.log('   - sdgContribution (string, optional)');
    console.log('   - supportingLinks (string[], optional)');
    console.log('   - status (string, required, default: draft)');
    console.log('   - createdBy (string, required)');
    console.log('   - createdByUsername (string, required)');
    console.log('   - approvedBy (string, optional)');
    console.log('   - approvedByUsername (string, optional)');
    console.log('   - adminNotes (string, optional)');
    console.log('');
    console.log('7. Create indexes for better performance:');
    console.log('   - status_index (key, attributes: status)');
    console.log('   - country_index (key, attributes: interventionCountry)');
    console.log('   - created_by_index (key, attributes: createdBy)');
    console.log('');
    console.log('8. After setup, run: npm run migrate');
    console.log('');
}

// Run the test
testConnection().then(() => {
    showSetupInstructions();
}).catch(error => {
    console.log('❌ Test failed:', error.message);
    showSetupInstructions();
}); 