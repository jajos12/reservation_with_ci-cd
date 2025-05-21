const mongoose = require('mongoose');

describe('Database Connection', () => {
    beforeAll(async () => {
        // Ensure connection is established before tests
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book-reservation-test');
        }
    });

    it('should connect to MongoDB', () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 means connected
    });

    it('should have the correct database name', () => {
        const dbName = mongoose.connection.name;
        expect(dbName).toBe('book-reservation-test');
    });

    it('should handle connection errors gracefully', async () => {
        const invalidConfig = {
            database: 'mongodb://localhost:27017/nonexistent'
        };
        
        try {
            await mongoose.connect(invalidConfig.database);
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should maintain connection state', async () => {
        // Ensure connection is still active
        expect(mongoose.connection.readyState).toBe(1);
        expect(mongoose.connection.host).toBeDefined();
        expect(mongoose.connection.name).toBeDefined();
        
        // Test a simple database operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        expect(Array.isArray(collections)).toBe(true);
    });
}); 