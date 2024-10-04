const { sql } = require('../config/db');

class ExpenseCategories{

    static async getCategories() {
        const result = await sql.query`SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories`;
        return result.recordset;
    }    

    static async getCategoryById(id){
        const result = await sql.query`SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Id = ${id}`
        return result.recordset
    }

    static async getCategoryByCategory(category){
        const result = await sql.query`SELECT * FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Category = ${category}`
        return result.recordset
    }

    static async addExpenseCategory(category) {
        try{
            const result = await sql.query`INSERT INTO ${process.env.DB_NAME}.dbo.ExpenseCategories (category) VALUES (${category})`;
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async updateExpenseCategory(categoryObj) {
        try{
            const result = await sql.query`Update ${process.env.DB_NAME}.dbo.ExpenseCategories SET category = (${categoryObj.category}) Where Id = ${categoryObj.id}`;
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async deleteCategoryById(id) {
        const result = await sql.query`DELETE FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Id = ${id}`;
        return result.recordset;
    } 
    
    static async deleteCategoryByCategory(category) {
        const result = await sql.query`DELETE FROM ${process.env.DB_NAME}.dbo.ExpenseCategories Where Category = ${category}`;
        return result.recordset;
    } 
}

module.exports = ExpenseCategories