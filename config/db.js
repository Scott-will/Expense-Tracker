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
    } catch (error) {
        console.error('SQL Server connection failed:', error);
        process.exit(1);
    }
};

module.exports = { connectDB, sql };
