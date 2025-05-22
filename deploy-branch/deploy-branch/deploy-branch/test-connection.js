const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://yonatangetachew91:ChxgoxgwUJffFNwW@cluster0.dgv3i2h.mongodb.net/book-reservation?retryWrites=true&w=majority&appName=Cluster0&serverSelectionTimeoutMS=10000';

async function testConnection() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        serverSelectionTimeoutMS: 10000
    });

    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Successfully connected to MongoDB!');
        
        // Test the connection by listing databases
        const dbs = await client.db().admin().listDatabases();
        console.log('Available databases:', dbs.databases.map(db => db.name));
        
    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        await client.close();
    }
}

testConnection(); 