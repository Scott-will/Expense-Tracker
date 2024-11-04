const Expense = require('../models/Expense');
const GenerateError = require('./controllerHelpers/controllerHelpers');
const ExpenseQueryParams = require('./queryParams/ExpenseQueryParams');
const ExpenseView = require('../views/expenseView')


exports.GetExpenses = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try {
            const expenses = await Expense.GetExpense();
            res.json(expenses);
            return res;
        } catch (error) {
            console.log(error)
            res = GenerateError(res)
            return res;
        }
    }
    const queryParams = new ExpenseQueryParams(req.query)
    if(queryParams.Id){
        try{
            const expense = await Expense.GetExpenseById(id);
            res.json(expense)
        }
        catch(error){
            console.log(error)
            res = GenerateError(res)
            return res;
        }
        
    }
    else if(queryParams.Category){
        try{
            const expenses = await Expense.GetExpensesByCategory(id);
            res.json(expenses)
        }
        catch(error){
            console.log(error)
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
        console.log(error)
        res = GenerateError()
    }
};

exports.DeleteExpense = async (req, res) =>{
    if(Object.keys(req.query).length == 0){
        res.GenerateError(res)
    }
    const queryParams = new ExpenseQueryParams(req.query);
    if(queryParams.Id){
        try {
            await Expense.DeleteExpense(queryParams.Id);
            res.status(201).json({ message: 'Expense deleted successfully' });
        } catch (error) {
            console.log(error)
            res = GenerateError()
        }
    }
    
}

exports.UpdateExpense = async (req, res) => {

}
