const { sql } = require('../config/db');

class ExpenseCategories{

    static async getCategories() {
        const result = await sql.query`SELECT * FROM ExpenseCategories`;
        return result.recordset;
    }    

    static async getCategoryById(id){
        const result = await sql.query`SELECT * FROM ExpenseCategories Where Id = ${id}`
        return result.recordset
    }

    static async getCategoryByCategory(category){
        const result = await sql.query`SELECT * FROM ExpenseCategories Where Category = ${category}`
        return result.recordset
    }

    static async addExpenseCategory(category) {
        try{
            const result = await sql.query`INSERT INTO ExpenseCategories (category) VALUES (${category})`;
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async updateExpenseCategory(id) {
        try{
            const result = await sql.query`Update ExpenseCategories SET category = (${category}) Where Id = ${id}`;
            return result.rowsAffected;
        }
        catch(error){
            console.log(error)
            return null
        }
    }

    static async deleteCategoryById(id) {
        const result = await sql.query`DELETE FROM ExpenseCategories Where Id = ${id}`;
        return result.recordset;
    } 
    
    static async deleteCategoryByCategory(category) {
        const result = await sql.query`DELETE FROM ExpenseCategories Where Category = ${category}`;
        return result.recordset;
    } 
}

module.exports = ExpenseCategories