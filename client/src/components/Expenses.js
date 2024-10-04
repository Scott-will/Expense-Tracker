import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

  useEffect(() => {
    const loadExpenses = async () =>{
      await getExpenseList()
    }
    loadExpenses();
    }, []);
    
    function getRowId(row){
      return row.Id;
    }
    const columns = [
      { field: "CategoryId" },
      { field: "Amount" },
      { field: "Date" },
      { field: "Description" }
    ]

  return (
    expenses && expenses.length != 0 ?
    <DataGrid
    getRowId={getRowId}
    columns={columns}
    rows={expenses}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    sx={{border:0}}/>
    : <p>No Expense found</p>
    
  );
  
} 