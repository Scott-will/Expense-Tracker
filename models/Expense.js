const { sql } = require('../config/db');

class Expense {
    static async getAll() {
        const result = await sql.query`SELECT * FROM Expenses`;
        return result.recordset;
    }

    static async add(description, amount) {
        const result = await sql.query`INSERT INTO Expenses (description, amount) VALUES (${description}, ${amount})`;
        return result.rowsAffected;
    }
}

module.exports = Expense;
