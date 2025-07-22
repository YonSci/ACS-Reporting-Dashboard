import { Client, Databases, Account } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Appwrite Configuration
const APPWRITE_ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.VITE_APPWRITE_API_KEY;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || 'acs-dashboard';
const REPORTS_COLLECTION_ID = process.env.VITE_APPWRITE_REPORTS_COLLECTION_ID || 'reports';

console.log('🔍 Testing Appwrite Permissions...');
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

// Initialize services
const databases = new Databases(client, APPWRITE_PROJECT_ID);
const account = new Account(client);

async function testPermissions() {
    console.log('🧪 Testing different operations...\n');

    // Test 1: List databases
    console.log('1️⃣ Testing: List databases');
    try {
        const databasesList = await databases.list();
        console.log('✅ SUCCESS: Can list databases');
        console.log('   Found databases:', databasesList.databases.length);
    } catch (error) {
        console.log('❌ FAILED: Cannot list databases');
        console.log('   Error:', error.message);
        console.log('   Required permission: databases.read');
    }
    console.log('');

    // Test 2: Get specific database
    console.log('2️⃣ Testing: Get specific database');
    try {
        const database = await databases.get(DATABASE_ID);
        console.log('✅ SUCCESS: Can access database');
        console.log('   Database name:', database.name);
    } catch (error) {
        console.log('❌ FAILED: Cannot access database');
        console.log('   Error:', error.message);
        console.log('   Required permission: databases.read');
    }
    console.log('');

    // Test 3: List collections
    console.log('3️⃣ Testing: List collections');
    try {
        const collections = await databases.listCollections(DATABASE_ID);
        console.log('✅ SUCCESS: Can list collections');
        console.log('   Found collections:', collections.collections.length);
    } catch (error) {
        console.log('❌ FAILED: Cannot list collections');
        console.log('   Error:', error.message);
        console.log('   Required permission: collections.read');
    }
    console.log('');

    // Test 4: Get specific collection
    console.log('4️⃣ Testing: Get specific collection');
    try {
        const collection = await databases.getCollection(DATABASE_ID, REPORTS_COLLECTION_ID);
        console.log('✅ SUCCESS: Can access collection');
        console.log('   Collection name:', collection.name);
    } catch (error) {
        console.log('❌ FAILED: Cannot access collection');
        console.log('   Error:', error.message);
        console.log('   Required permission: collections.read');
    }
    console.log('');

    // Test 5: List documents
    console.log('5️⃣ Testing: List documents');
    try {
        const documents = await databases.listDocuments(DATABASE_ID, REPORTS_COLLECTION_ID);
        console.log('✅ SUCCESS: Can list documents');
        console.log('   Found documents:', documents.documents.length);
    } catch (error) {
        console.log('❌ FAILED: Cannot list documents');
        console.log('   Error:', error.message);
        console.log('   Required permission: documents.read');
    }
    console.log('');

    // Test 6: Create document
    console.log('6️⃣ Testing: Create document');
    try {
        const testDoc = {
            strategicResultArea: "Test Area",
            subStrategicResultArea: "Test Sub Area",
            interventionCountry: "Test Country",
            year: 2024,
            partnerships: ["Test Partner"],
            details: ["Test detail"],
            sdgContribution: "Test SDG",
            supportingLinks: ["https://test.com"],
            status: "approved",
            createdBy: "test",
            createdByUsername: "Test User"
        };

        const result = await databases.createDocument(
            DATABASE_ID,
            REPORTS_COLLECTION_ID,
            'unique()',
            testDoc
        );
        console.log('✅ SUCCESS: Can create documents');
        console.log('   Created document ID:', result.$id);
        
        // Clean up - delete the test document
        try {
            await databases.deleteDocument(DATABASE_ID, REPORTS_COLLECTION_ID, result.$id);
            console.log('   Cleaned up test document');
        } catch (cleanupError) {
            console.log('   Warning: Could not clean up test document');
        }
    } catch (error) {
        console.log('❌ FAILED: Cannot create documents');
        console.log('   Error:', error.message);
        console.log('   Required permission: documents.write');
    }
    console.log('');

    console.log('📋 SUMMARY:');
    console.log('===========');
    console.log('Based on the tests above, you need to add these permissions to your API key:');
    console.log('');
    console.log('🔑 Go to Appwrite Console → API Keys → Edit your key');
    console.log('📝 Add these permissions:');
    console.log('   ✅ databases.read');
    console.log('   ✅ collections.read');
    console.log('   ✅ documents.read');
    console.log('   ✅ documents.write');
    console.log('');
    console.log('💡 Or create a new API key with "Full Access" to your project');
}

// Run tests
testPermissions(); 