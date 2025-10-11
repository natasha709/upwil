const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/upwil'; // Adjust if needed

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('upwil');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        console.log('Continuing without database...');
        return null;
    }
}

module.exports = { connectDB };