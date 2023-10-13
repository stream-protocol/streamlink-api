const db = require('./config/db');
const { QueryFile } = require('pg-promise');

// Define the SQL script for table creation
const createUserTable = new QueryFile('./sql/createUserTable.sql');

// Function to create the users table
async function createUsersTable() {
    try {
        await db.none(createUserTable);
        console.log('User table created');
    } catch (error) {
        console.error('Error creating user table:', error);
    } finally {
        db.$pool.end(); // Close the database connection when done
    }
}

createUsersTable();