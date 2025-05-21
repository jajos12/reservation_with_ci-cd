require('dotenv').config();
const mongoose = require('mongoose');

// Increase timeout for all tests
jest.setTimeout(60000);

// Connect to MongoDB before all tests
beforeAll(async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-reservation-test';
        await mongoose.connect(mongoUri);
        // Wait for connection to be established
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
});

// Clear all data after each test
afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    }
});

// Close MongoDB connection after all tests
afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
    }
}); 