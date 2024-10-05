import './App.css';

import { ExpenseCategoriesApi, ExpenseCategory } from './apiClient';
import React, {useState, useEffect} from 'react'

const App: React.FC = () => {
const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>();

  useEffect(() => {
    getExpenseCategories();
  }, [])

  const getExpenseCategories = async () =>{
    const api = new ExpenseCategoriesApi();
    try {
      const response = await api.getExpenseCategories();
      setExpenseCategories(response.data);
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      // Optionally set an error state or display a message to the user
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          {expenseCategories?.map(function(d){
         return (<li key={d.Category}>{d.Category}</li>)
       })}
        </div>
      </header>
    </div>
  );
}

export default App;
