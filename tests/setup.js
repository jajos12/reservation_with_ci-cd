const mongoose = require('mongoose');

// Increase timeout for all tests
jest.setTimeout(30000);

// Connect to MongoDB before all tests
beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-reservation-test';
    await mongoose.connect(mongoUri);
});

// Clear all data after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany();
    }
});

// Close MongoDB connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
}); 