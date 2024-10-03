import React, { useState, useEffect } from 'react';

export default function ExpenseList(){
  
  const [expenses, setExpenses] = useState(null)
  
  async function getExpenseList(){
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      if (response.status === 200) {
        console.log('Promise resolved and HTTP status is successful');
        const jsonPayload = await response.json()
        setExpenses(jsonPayload)
      } else {
        console.error('Promise resolved but HTTP status failed');
      }
    } catch(error) {
      console.error(error)
      console.error('Promise rejected');
    }   
    
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method:'DELETE'
      });
      if (response.ok) {
        console.log('Promise resolved and HTTP status is successful');
        setExpenses(response.body)
      } else {
        console.error('Promise resolved but HTTP status failed');
      }
    } catch {
      console.error('Promise rejected');
    }  
  }

  useEffect(() => {
    const loadExpenses = async () =>{
      await getExpenseList()
    }
    loadExpenses();
    }, []);

  return (
    <div className="expense-list">
      {expenses && expenses.length > 0 ? (
        expenses.map(expense => (
          <ExpenseItem key={expense.Id} expense={expense} onDelete={handleDelete} />
        ))
      ) : (
        <p>No expenses available.</p> // Optional: display a message when no expenses
      )}
    </div>
  );
  
} 

const ExpenseItem = ({ expense, onDelete }) => {
  const { CategoryId, Amount, Date, Description } = expense;
  
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className="expense-item">
      <p>Category: {CategoryId}</p>
      <p>Amount: ${Amount}</p>
      <p>Date: {Date}</p>
      <p>Description: {Description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};