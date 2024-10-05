import React, {useState, useEffect} from 'react'
import { ExpensesApi, Expense } from '../apiClient'

const ExpenseGrid = () => {
   const [expenseState, setExpenseState] = useState<Expense[]>();

   useEffect(() =>{
    getExpenses();
  }, []);

  async function getExpenses(){
    const api = new ExpensesApi();
    const response = await api.getExpenses();
    setExpenseState(response.data);
  }

  return(
    !expenseState || expenseState.length == 0 ? 
    <p>No Data To Show</p> :
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {expenseState?.map(row => (
          <tr key={row.CategoryId}>
            <td>{row.Amount}</td>
            <td>{row.Date}</td>
            <td>{row.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  )
}

export default ExpenseGrid