
require('dotenv').config();const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const expenseCategoriesRoutes = require('./routes/expenseCategoriesRoutes')

const app = express();

connectDB();

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/expenses', expenseRoutes);
app.use('/api/expense-categories', expenseCategoriesRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app
