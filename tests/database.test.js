const mongoose = require('mongoose');
const config = require('../config/database');

describe('Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(config.database);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database', () => {
    expect(mongoose.connection.readyState).toBe(1);
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