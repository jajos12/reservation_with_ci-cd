const mongoose = require('mongoose');
const config = require('../config/database');

describe('Database Connection', () => {
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

  it('should maintain connection state', () => {
    expect(mongoose.connection.readyState).toBe(1);
    expect(mongoose.connection.host).toBeDefined();
    expect(mongoose.connection.name).toBeDefined();
  });
}); 