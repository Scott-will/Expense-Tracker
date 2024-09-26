const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true, // Use true if you're on Azure
        trustServerCertificate: true, // Set to true for local dev / self-signed certs
    },
};
const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('SQL Server connected');
        await initializeDatabase();
    } catch (error) {
        console.error('SQL Server connection failed:', error);
        process.exit(1);
    }
};

// Function to initialize the database and create tables
const initializeDatabase = async () => {
    try {
        // Create the database if it doesn't exist
        await sql.query`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = ${process.env.DB_NAME}) 
                        CREATE DATABASE ${process.env.DB_NAME}`;
        
        // Use the database
        await sql.query`USE ${process.env.DB_NAME}`;

        // Create the Expenses table if it doesn't exist
        await sql.query`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Expenses' AND xtype='U')
            CREATE TABLE Expenses (
                Id INT PRIMARY KEY IDENTITY(1,1),
                Description NVARCHAR(255) NOT NULL,
                Amount DECIMAL(10, 2) NOT NULL,
                Date DATETIME DEFAULT GETDATE()
            )`;
        
        console.log('Database initialized and tables created');
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

module.exports = { connectDB, sql };
