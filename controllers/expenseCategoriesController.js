const ExpenseCategories = require('../models/ExpenseCategories');
const ExpenseCategoryQueryParams = require('./queryParams/ExpenseCategoryQueryParams')

//Get
exports.getCategories = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        try{
            const categories = await ExpenseCategories.getCategories()
            if(categories == null){
                res = GenerateError(res)
            }
            res.json(categories)
        }
        catch(error) {
            res = GenerateError(res)
        }
        return res;
    }
    const queryParams = new ExpenseCategoryQueryParams(req.query)
    console.log(queryParams)
    if(queryParams.Id){
        try{
            const categories = await ExpenseCategories.getCategoryById(queryParams.Id)
            if(categories == null){
                res = GenerateError(res)
            }
            res.json(categories)
        }
        catch(error) {
            res = GenerateError(res)
        }
    }
    else if(queryParams.Category){
        try{
            const categories = await ExpenseCategories.getCategoryByCategory(queryParams.Category)
            if(categories == null){
                res = GenerateError(res)
            }
            res.json(categories)
        }
        catch(error) {
            res = GenerateError(res)
        }
    }    
    return res    
}

//add
exports.addExpenseCategory = async(req, res) => {
    const categoryObj =req.body
    console.log(categoryObj)
    try{
        await ExpenseCategories.addExpenseCategory(categoryObj.category)
        res.status(201).json({ message: 'Expense category added successfully' });
    }
    catch(error) {
        res = GenerateError(res)
    }   
}

//delete
exports.deleteCategory = async(req, res) => {
    if (Object.keys(req.query).length === 0) {
        res = GenerateError(res)
    }
    const queryParams = new ExpenseCategoryQueryParams(req.query)
    console.log(queryParams)
    if(queryParams.Id){
        try{
            const categories = await ExpenseCategories.deleteCategoryById(queryParams.Id)
            res.status(201).json({ message: 'Expense category deleted successfully' });
        }
        catch(error) {
            res = GenerateError(res)
        }
    }
    else if(queryParams.Category){
        try{
            const categories = await ExpenseCategories.deleteCategoryByCategory(queryParams.Category)
            res.status(201).json({ message: 'Expense category deleted successfully' });
        }
        catch(error) {
            res = GenerateError(res)
        }
    }
}

exports.updateCategory = async (req, res) => {
    const categoryObj =req.body
    console.log(categoryObj)
    try{
        await ExpenseCategories.updateExpenseCategory(categoryObj.Id)
        res.status(201).json({ message: 'Expense category updated successfully' });
    }
    catch(error) {
        res = GenerateError(res)
    }   
}

//helper
function GenerateError(res){
    res.status(500).json({ message: 'Server error' });
}