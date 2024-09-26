const request = require('supertest');
const app = require('../app'); // Adjust path as necessary
const { sql } = require('../config/db'); // Import the database connection

beforeAll(async () => {
    await sql.connect();
    await sql.query`CREATE TABLE Expenses (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Description NVARCHAR(255) NOT NULL,
        Amount DECIMAL(10, 2) NOT NULL,
        Date DATETIME DEFAULT GETDATE()
    )`;
});

afterAll(async () => {
    await sql.query`DROP TABLE Expenses`;
    await sql.close();
});

describe('Expense API', () => {
    it('should create a new expense', async () => {
        const response = await request(app)
            .post('/api/expenses')
            .send({ description: 'Lunch', amount: 10.50 });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Expense added successfully');
    });

    it('should retrieve all expenses', async () => {
        const response = await request(app).get('/api/expenses');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should update an existing expense', async () => {
        const createResponse = await request(app)
            .post('/api/expenses')
            .send({ description: 'Dinner', amount: 20.00 });

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
    });
});
