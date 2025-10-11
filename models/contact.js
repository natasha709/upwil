const { connectDB } = require('../config/db');

async function saveContact(name, email, message) {
    const db = await connectDB();
    if (!db) {
        console.log('Contact not saved - no database connection');
        return;
    }
    const collection = db.collection('contacts');
    await collection.insertOne({ name, email, message, date: new Date() });
    console.log('Contact saved');
}

module.exports = { saveContact };