// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const {
    GetExpenses,
    AddExpense
} = require('../controllers/expenseController');

// Define routes
router.get('/', GetExpenses); // GET all expenses
router.post('/', AddExpense); // POST a new expense

module.exports = router;