const { sql } = require('../config/db');

class ExpenseCategories{

    static async getCategories() {
        const query = `SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories`;
        const result = await sql.query(query);
        return result.recordset;
    }    

    static async getCategoryById(id){
        const query = `SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Id = ${id}`
        const result = await sql.query(query);
        return result.recordset
    }

    static async getCategoryByCategory(category){
        const query = `SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Category = '${category}'`
            const result = await sql.query(query);
        return result.recordset
    }

    static async addExpenseCategory(category) {
        try{
            const query = `INSERT INTO ${process.env.DB_NAME}.dbo.ExpenseCategories (category) VALUES ('${category}')`
            const result = await sql.query(query);
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async updateExpenseCategory(categoryObj) {
        try{
            const query = `Update ${process.env.DB_NAME}.dbo.ExpenseCategories SET category = '(${categoryObj.category})' Where Id = ${categoryObj.id}`;
            const result = await sql.query(query);
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async deleteCategoryById(id) {
        const query = `DELETE FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Id = ${id}`;
        const result = await sql.query(query);
        return result.recordset;
    } 
    
    static async deleteCategoryByCategory(category) {
        const query = `DELETE FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Category = '${category}'`;
        const result = await sql.query(query);
        return result.recordset;
    } 
}

module.exports = ExpenseCategories