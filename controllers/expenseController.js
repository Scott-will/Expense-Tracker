const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.getAll();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addExpense = async (req, res) => {
    const { description, amount } = req.body;

    try {
        await Expense.add(description, amount);
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExpense = async (req, res) =>{

}

exports.updateExpense = async (req, res) => {

}

exports.getExpenseByType = async (req, res) => {
    
}
