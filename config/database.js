const { ServerApiVersion } = require('mongodb');

module.exports = {
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/book-reservation',
    secret: process.env.JWT_SECRET || 'your_jwt_secret'
};