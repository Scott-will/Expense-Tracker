// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
} = require('../controllers/expenseController');

// Define routes
router.get('/', getExpenses); // GET all expenses
router.post('/', addExpense); // POST a new expense
router.put('/', updateExpense); // PUT (update) an existing expense
router.delete('/', deleteExpense); // DELETE an expense

module.exports = router;
