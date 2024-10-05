const request = require('supertest');
const app = require('../app'); // Adjust path as necessary
const { sql } = require('../config/db'); // Import the database connection

beforeAll(async () => {
    await sql.connect();

    try {
        await sql.query`
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ExpenseTrackerTest') 
    BEGIN
    CREATE DATABASE [ExpenseTrackerTest]
    END;`
        await sql.query`
    Use ExpenseTrackerTest;
    Create TABLE ExpenseCategories(
            Id INT PRIMARY KEY IDENTITY(1,1),
            Category NVARCHAR(255) Not NULL
    );`
        await sql.query`CREATE TABLE Expenses (
    Id INT PRIMARY KEY IDENTITY(1,1),
	CategoryId int
    FOREIGN Key (CategoryId) REFERENCES ExpenseCategories(Id),
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATETIME DEFAULT GETDATE(),
    Description NVARCHAR(255) NULL
);`;
    }
    catch (error) {
        console.log(error);
    }

});

afterAll(async () => {
    await sql.query`DROP Table Expenses; Drop Table ExpenseCategories;`;
    await sql.close();
});

async function addExpenseCategory(category) {
    const response = await request(app)
        .post('/api/expense-categories/')
        .send({ category: category });
    return response
}

async function getCategories() {
    const getResponse = await request(app)
        .get('/api/expense-categories/')
    expect(getResponse.statusCode).toBe(200);
    const obj = getResponse.body
    return obj
}

async function getCategoriesAndCheckLength(length) {
    obj = await getCategories();
    expect(obj.length == length)
}

async function addExpense(expense) {
    const response = await request(app)
        .post('/api/expenses')
        .send(expense);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Expense added successfully');
}

async function getExpense() {
    const response = await request(app).get('/api/expenses');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    return response.body
}

async function getExpenseAndCheckLength(length) {
    obj = await getExpense();
    expect(obj.length == length);
}

describe('Expense Categories API', () => {
    it('should create 2 new expense category', async () => {
        console.log("Running test: should create 2 new expense category")
        const response = await addExpenseCategory('Food')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category added successfully');

        const response2 = await addExpenseCategory('Car')
        expect(response2.statusCode).toBe(201);
        expect(response2.body.message).toBe('Expense category added successfully');
    });

    //get all
    it('Should get both expense categories', async () => {
        
        console.log("Running test: Should get both expense categories")
        await getCategoriesAndCheckLength(2)
    });


    //getbyid
    it('Should get expense category with Id 1', async () => {
        console.log("Should get expense category with Id 1")
        const getResponse = await request(app)
            .get('/api/expense-categories?Id=1')
        expect(getResponse.statusCode).toBe(200);
        const obj = getResponse.body
        expect(obj.length == 1)
        expect(obj[0].category == 'Food')
    });

    //getbycategory
    it('Should get expense category car', async () => {
        console.log("Should get expense category car")
        const getResponse = await request(app)
            .get('/api/expense-categories?Category=Car')
        expect(getResponse.statusCode).toBe(200);
        const obj = getResponse.body
        expect(obj.length == 1)
        expect(obj[0].category == 'Car')
    });

    //deletebyid
    it('Should delete category with id 1', async () => {
        console.log("delete category with id 1")
        const response = await request(app)
            .delete('/api/expense-categories?Category=Car')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category deleted successfully');
        getCategoriesAndCheckLength(1)
    });

    //deletebycategory
    it('Should delete category car', async () => {
        console.log("Should delete category car")
        const response = await request(app)
            .delete('/api/expense-categories?Category=Car')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category deleted successfully');
        getCategoriesAndCheckLength(0)
    });

    it('Should udpate existing category with id 3', async () => {
        console.log("Should udpate existing category with id 3")
        const response = await addExpenseCategory('Food')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category added successfully');

        const updateResponse = await request(app)
            .put('/api/expense-categories/')
            .send({ id: 3, category: 'Drinks' });
        expect(updateResponse.statusCode).toBe(201);
        expect(updateResponse.body.message).toBe('Expense category updated successfully');

        const getResponse = await getCategories();
        expect(getResponse.length == 1);
        expect(getResponse[0].category == 'Drinks');
    })

});

describe('Expense API', () => {
    it('should create a new expense', async () => {
        console.log("Should create a new expense")
        const expense = { category: 3, description: 'Lunch', amount: 10.50, date: new Date(Date.now()).toISOString() }
        await addExpense(expense)
        const expense2 = { category: 3, description: 'Dinner', amount: 20.0, date: new Date(Date.now()).toISOString() }
        await addExpense(expense)
    });

    it('should retrieve all expenses', async () => {
        console.log("Should retrieve all expenses")
        await getExpenseAndCheckLength(2)
    });

    /*it('should update an existing expense', async () => {
        const createResponse = await request(app)
            .put('/api/expenses')
            .send({ Id: 1, category: 3, description: 'Lunch', amount: 15.50, date: new Date(Date.now()).toISOString() });

        const expenseId = createResponse.body.id; // Adjust based on your response structure

        const updateResponse = await request(app)
            .put(`/api/expenses/${expenseId}`)
            .send({ description: 'Updated Dinner', amount: 25.00 });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.message).toBe('Expense updated successfully');
    });

    it('should delete an expense', async () => {
        const createResponse = await request(app)
            .post('/api/expenses')
            .send({ description: 'Snacks', amount: 5.00 });

        const expenseId = createResponse.body.id; // Adjust based on your response structure

        const deleteResponse = await request(app).delete(`/api/expenses/${expenseId}`);

        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe('Expense deleted successfully');
    });*/
});