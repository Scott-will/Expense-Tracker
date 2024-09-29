const Expense = require('../models/Expense');
const GenerateError = require('./controllerHelpers/controllerHelpers');
const ExpenseQueryParams = require('./queryParams/expenseQueryParams');
const ExpenseView = require('../views/expenseView')


exports.GetExpenses = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const expenses = await Expense.GetAllExpenses();
            res.json(expenses);
            return res;
        } catch (error) {
            res = GenerateError(res)
        }
    }
    const queryParams = new ExpenseQueryParams(req.query)
    if(queryParams.Id){
        try{
            const expense = await Expense.GetExpenseById(id);
            res.json(expense)
        }
        catch(error){
            res = GenerateError(res)
        }
        
    }
    else if(queryParams.Category){
        try{
            const expenses = await Expense.GetExpensesByCategory(id);
            res.json(expenses)
        }
        catch(error){
            res = GenerateError(res)
        }
    }
    return res    
};

exports.AddExpense = async (req, res) => {
    const expense = new ExpenseView(req.body);
    try {
        await Expense.AddExpense(expense);
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        res = GenerateError()
    }
};

exports.DeleteExpense = async (req, res) =>{

}

exports.UpdateExpense = async (req, res) => {

}
