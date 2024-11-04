const { sql } = require('../config/db');

class Expense {
    static async GetExpense() {
        const query = `SELECT * FROM  ${process.env.DB_NAME}.dbo.Expenses`
        const result = await sql.query(query);
        return result.recordset;
    }

    //better way to do this?
    static async GetExpenseByCategory(category) {
        const result = await sql.query`SELECT * FROM  ${process.env.DB_NAME}.dbo.Expenses where CategoryId = ${category}`;
        return result.recordset;
    }

    static async GetExpenseById(id) {
        const result = await sql.query`SELECT * FROM  ${process.env.DB_NAME}.dbo.Expenses Where Id = ${id}`;
        return result.recordset;
    }

    static async AddExpense(expenseView) {
        const query = `INSERT INTO ${process.env.DB_NAME}.dbo.Expenses (CategoryId, Amount, Date, Description) VALUES (${expenseView.Category}, ${expenseView.Amount}, '${expenseView.Date}', '${expenseView.Description}')`
        try{
            const result = await sql.query(query);
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async UpdateExpense(expenseView) {
        const result = await sql.query`Update  ${process.env.DB_NAME}.dbo.Expenses SET category = ${expenseView.Category}, amount = ${expenseView.Amount}, date = ${expenseView.Date}, description = ${expenseView.Description} Where Id = ${expenseView.Id}`;
        return result.rowsAffected;
    }

    static async DeleteExpense(id) {
        const query = `Delete From  ${process.env.DB_NAME}.dbo.Expenses Where Id = ${id}`;
        const result = await sql.query(query);
        return result.rowsAffected;
    }
}

module.exports = Expense;
