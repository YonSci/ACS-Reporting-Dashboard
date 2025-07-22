# 🚀 **Migration Guide: MongoDB → Appwrite**

## 📋 **Overview**

This guide will help you migrate your ACS Reporting Dashboard from MongoDB to Appwrite, providing a more reliable and easier-to-manage database solution.

## 🎯 **Benefits of Appwrite**

- ✅ **No server setup required** - Cloud-based solution
- ✅ **Easy authentication** - Built-in user management
- ✅ **Real-time updates** - WebSocket support
- ✅ **Better performance** - Optimized for web apps
- ✅ **Free tier available** - Generous free plan
- ✅ **Simple API** - Easy to integrate

## 📋 **Prerequisites**

1. **Appwrite Account**: Sign up at [cloud.appwrite.io](https://cloud.appwrite.io)
2. **Node.js**: Version 16 or higher
3. **npm**: For package management

## 🚀 **Step-by-Step Migration**

### **Step 1: Create Appwrite Project**

1. **Go to Appwrite Console**: [cloud.appwrite.io](https://cloud.appwrite.io)
2. **Create New Project**: 
   - Name: `ACS-Reporting-Dashboard`
   - Project ID: Will be auto-generated
3. **Save Project ID**: You'll need this for configuration

### **Step 2: Create Database & Collection**

1. **Go to Databases** in your Appwrite project
2. **Create Database**:
   - Name: `ACS Dashboard`
   - Database ID: `acs-dashboard`

3. **Create Collection**:
   - Name: `Reports`
   - Collection ID: `reports`
   - Permissions: Read/Write for all users

4. **Add Attributes**:
   ```json
   {
     "strategicResultArea": "string (required)",
     "subStrategicResultArea": "string (optional)",
     "interventionCountry": "string (required)",
     "year": "integer (required)",
     "partnerships": "string[] (optional)",
     "details": "string[] (optional)",
     "sdgContribution": "string (optional)",
     "supportingLinks": "string[] (optional)",
     "status": "string (required, default: draft)",
     "createdBy": "string (required)",
     "createdByUsername": "string (required)",
     "approvedBy": "string (optional)",
     "approvedByUsername": "string (optional)",
     "adminNotes": "string (optional)",
   }
   ```

### **Step 3: Create API Key**

1. **Go to API Keys** in your Appwrite project
2. **Create API Key**:
   - Name: `ACS Dashboard API Key`
   - Permissions: 
     - Databases: Read/Write
     - Collections: Read/Write
3. **Save API Key**: You'll need this for server authentication

### **Step 4: Configure Environment Variables**

Create a `.env` file in your project root:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id-here
VITE_APPWRITE_API_KEY=your-api-key-here
VITE_APPWRITE_DATABASE_ID=acs-dashboard
VITE_APPWRITE_REPORTS_COLLECTION_ID=reports

# Server Configuration
PORT=3001
NODE_ENV=development
ALLOWED_ORIGIN=http://localhost:3000
```

**Replace the placeholders with your actual values from Appwrite.**

### **Step 5: Install Appwrite Dependencies**

```bash
cd server
npm install appwrite@^14.0.1
```

### **Step 6: Run Migration Script**

```bash
cd server
npm run migrate
```

This will:
- ✅ Create database and collection if they don't exist
- ✅ Migrate all mock data to Appwrite
- ✅ Set up proper indexes for performance
- ✅ Show migration progress and results

### **Step 7: Test the Migration**

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Check connection**:
   - Visit: `http://localhost:3001`
   - Should show: `"dbConnected": true`

3. **Test API endpoints**:
   - `GET /api/reports` - Should return data from Appwrite
   - `POST /api/reports` - Should create new reports in Appwrite

## 🔧 **Configuration Files**

### **Frontend Configuration** (`src/lib/appwrite.js`)
- Handles client-side Appwrite operations
- Provides helper functions for reports
- Manages authentication and data fetching

### **Server Configuration** (`server/config/appwrite.js`)
- Server-side Appwrite integration
- API endpoints for CRUD operations
- Error handling and fallbacks

### **Migration Script** (`scripts/migrate-to-appwrite.js`)
- Automated data migration
- Database and collection setup
- Progress tracking and error handling

## 📊 **Data Structure**

### **Report Document Structure**
 ```json
 {
   "$id": "unique-document-id",
   "strategicResultArea": "Economic Development",
   "subStrategicResultArea": "Trade Facilitation",
   "interventionCountry": "Nigeria",
   "year": 2024,
   "partnerships": ["UNECA", "African Union"],
   "details": ["Implemented new trade policies", "Reduced border delays"],
   "sdgContribution": "SDG 8: Decent Work and Economic Growth",
   "supportingLinks": ["https://example.com/report1", "https://example.com/report2"],
   "status": "approved",
   "createdBy": "user@example.com",
   "createdByUsername": "John Doe",
   "approvedBy": "admin@example.com",
   "approvedByUsername": "Admin User",
   "adminNotes": "Approved after review",
   "$createdAt": "2024-01-01T00:00:00.000Z",
   "$updatedAt": "2024-01-01T00:00:00.000Z"
 }
 ```

## 🎯 **API Endpoints**

### **GET /api/reports**
- Returns all reports from Appwrite
- Fallback to mock data if Appwrite unavailable

### **POST /api/reports**
- Creates new report in Appwrite
- Includes user information and timestamps

### **GET /api/filters**
- Returns filter options (unchanged)
- Uses static data from constants

## 🔒 **Security & Permissions**

### **Appwrite Security**
- API Key authentication for server operations
- User-based permissions for client operations
- Automatic data validation and sanitization

### **Environment Variables**
- All sensitive data stored in `.env` file
- Never commit API keys to version control
- Use different keys for development/production

## 🚨 **Troubleshooting**

### **Common Issues**

**1. Connection Failed**
```
Appwrite Connection Error: [error details]
```
**Solution**: Check your API key and project ID in `.env`

**2. Collection Not Found**
```
Collection not found: reports
```
**Solution**: Run the migration script to create collections

**3. Permission Denied**
```
Permission denied: [operation]
```
**Solution**: Check API key permissions in Appwrite console

**4. Migration Failed**
```
Migration failed: [error details]
```
**Solution**: Check your API key has database creation permissions

### **Debug Commands**

```bash
# Test Appwrite connection
node -e "require('dotenv').config(); const { Client } = require('appwrite'); const client = new Client().setEndpoint(process.env.VITE_APPWRITE_ENDPOINT).setProject(process.env.VITE_APPWRITE_PROJECT_ID).setKey(process.env.VITE_APPWRITE_API_KEY); console.log('Appwrite client configured');"

# Check environment variables
node -e "require('dotenv').config(); console.log('Project ID:', process.env.VITE_APPWRITE_PROJECT_ID ? 'Set' : 'Not set'); console.log('API Key:', process.env.VITE_APPWRITE_API_KEY ? 'Set' : 'Not set');"
```

## ✅ **Verification Checklist**

- [ ] Appwrite project created
- [ ] Database and collection created
- [ ] API key generated with proper permissions
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Migration script run successfully
- [ ] Server starts without errors
- [ ] API endpoints return data from Appwrite
- [ ] New reports can be created
- [ ] Dashboard displays data correctly

## 🎉 **Migration Complete!**

Once all steps are completed, your dashboard will be using Appwrite as the database backend, providing:

- ✅ **Reliable data storage** in the cloud
- ✅ **Better performance** and scalability
- ✅ **Easy management** through Appwrite console
- ✅ **Real-time capabilities** for future enhancements
- ✅ **Built-in authentication** if needed later

## 🔄 **Next Steps**

1. **Monitor Performance**: Check Appwrite console for usage metrics
2. **Set Up Authentication**: Configure user authentication if needed
3. **Add Real-time Features**: Implement WebSocket updates
4. **Backup Strategy**: Set up regular data backups
5. **Production Deployment**: Configure production environment variables

---

**🎯 Your ACS Reporting Dashboard is now powered by Appwrite!** 