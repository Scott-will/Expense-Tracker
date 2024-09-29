const request = require('supertest');
const app = require('../app'); // Adjust path as necessary
const { sql } = require('../config/db'); // Import the database connection

beforeAll(async () => {
    await sql.connect();
    try{
        await sql.query`DROP TABLE ExpenseCategories`;
    }
    catch{

    }
    await sql.query`Create TABLE ExpenseCategories(
        Id INT PRIMARY KEY IDENTITY(1,1),
        Category NVARCHAR(255) Not NULL
    );`;
});

afterAll(async () => {
    await sql.query`DROP TABLE ExpenseCategories`;
    await sql.close();
});

async function addExpenseCategory(category) {
    const response = await request(app)
        .post('/api/expense-categories/')
        .send({ category: category });
    return response
}

async function getCategories(){
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

describe('Expense Categories API', () => {
    it('should create 2 new expense category', async () => {
        const response = await addExpenseCategory('Food')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category added successfully');

        const response2 = await addExpenseCategory('Car')
        expect(response2.statusCode).toBe(201);
        expect(response2.body.message).toBe('Expense category added successfully');
    });

    //get all
    it('Should get both expense categories', async () => {
        await getCategoriesAndCheckLength(2)
    });

    
    //getbyid
    it('Should get expense category with Id 1', async () => {
        const getResponse = await request(app)
        .get('/api/expense-categories?Id=1')
        expect(getResponse.statusCode).toBe(200);
        const obj = getResponse.body
        expect(obj.length == 1)
        expect(obj[0].category == 'Food')
    });

    //getbycategory
    it('Should get expense category car', async () => {
        const getResponse = await request(app)
        .get('/api/expense-categories?Category=Car')
        expect(getResponse.statusCode).toBe(200);
        const obj = getResponse.body
        expect(obj.length == 1)
        expect(obj[0].category == 'Car')
    });

    //deletebyid
    it('Should get delete category with id 1', async () => {
        const response = await request(app)
        .delete('/api/expense-categories?Category=Car')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category deleted successfully');
        getCategoriesAndCheckLength(1)
    });

    //deletebycategory
    it('Should get delete category with id 1', async () => {
        const response = await request(app)
        .delete('/api/expense-categories?Category=Car')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category deleted successfully');
        getCategoriesAndCheckLength(0)
    });

    it('Should udpate existing category with id 3', async () =>{
        const response = await addExpenseCategory('Food')
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense category added successfully');

        const updateResponse = await request(app)
        .put('/api/expense-categories/')
        .send({ category: 'Drinks' });
        expect(updateResponse.statusCode).toBe(201);
        expect(updateResponse.body.message).toBe('Expense category updated successfully');

        const getResponse = await getCategories();
        expect(getResponse.length == 1);
        expect(getResponse[0].category == 'Drinks');
    })

});