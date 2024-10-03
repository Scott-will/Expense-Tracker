
require('dotenv').config();const path = require('path')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const expenseCategoriesRoutes = require('./routes/expenseCategoriesRoutes')

const app = express();
app.use(cors())

connectDB();

app.use(bodyParser.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/expense-categories', expenseCategoriesRoutes)


module.exports = app
