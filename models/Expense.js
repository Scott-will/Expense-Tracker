const { sql } = require('../config/db');

class Expense {
    static async GetExpense() {
        const result = await sql.query`SELECT * FROM Expenses`;
        return result.recordset;
    }

    static async GetExpenseByType() {
        const result = await sql.query`SELECT * FROM Expenses`;
        return result.recordset;
    }

    static async AddExpense(expenseView) {
        const result = await sql.query`INSERT INTO Expenses (category, amount, date, description) VALUES (${expenseView.Category}, ${expenseView.Amount}, ${expenseView.Date}, ${expenseView.Description})`;
        return result.rowsAffected;
    }

    static async UpdateExpense(expenseView) {
        const result = await sql.query`Update Expenses SET category = ${expenseView.Category}, amount = ${expenseView.Amount}, date = ${expenseView.Date}, description = ${expenseView.Description} Where Id = ${expenseView.Id}`;
        return result.rowsAffected;
    }

    static async delete(id) {
        const result = await sql.query`Delete From Expenses Where Id = id`;
        return result.rowsAffected;
    }

}

module.exports = Expense;
