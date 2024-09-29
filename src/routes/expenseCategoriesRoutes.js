const express = require('express');
const router = express.Router();

const{
    getCategories,
    addExpenseCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/expenseCategoriesController');

//Define routes
router.get('/', getCategories);
router.post('/', addExpenseCategory);
router.delete('/', deleteCategory);
router.put('/', updateCategory);

module.exports = router;
