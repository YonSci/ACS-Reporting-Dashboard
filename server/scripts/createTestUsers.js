import { createUser, createAdmin } from '../db.js';

const createTestUsers = async () => {
    try {
        // Create a test user
        const userResult = await createUser('user@example.com', 'password123');
        console.log('Test user creation result:', userResult);

        // Create a test admin
        const adminResult = await createAdmin('admin@example.com', 'admin123');
        console.log('Test admin creation result:', adminResult);
    } catch (error) {
        console.error('Error creating test users:', error);
    }
};

createTestUsers(); 