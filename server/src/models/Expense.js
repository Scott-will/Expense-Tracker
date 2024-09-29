const { sql } = require('../config/db');

class Expense {
    static async GetExpense() {
        const result = await sql.query`SELECT * FROM  ${process.env.DB_NAME}.dbo.Expenses`;
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
        const query = `INSERT INTO ${process.env.DB_NAME}.dbo.Expenses (categoryId, amount, date, description) VALUES (${expenseView.Category}, ${expenseView.Amount}, '${expenseView.Date}', '${expenseView.Description}')`
        console.log(query)
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

    static async delete(id) {
        const result = await sql.query`Delete From  ${process.env.DB_NAME}.dbo.Expenses Where Id = id`;
        return result.rowsAffected;
    }
}

module.exports = Expense;
