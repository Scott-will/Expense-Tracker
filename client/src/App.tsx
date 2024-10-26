import './App.css';
import ExpenseGrid from './components/ExpenseGrid';
import ExpenseCategoryList from './components/ExpenseCategoryList';
import AddExpenseCategoryForm from './components/forms/AddExpenseCategoryForm';
import AddExpenseForm from './components/forms/AddExpenseForm';
import React, {useState, useEffect} from 'react'
import ExpenseCategoryCache from './cache/ExpenseCategoriesCache';


const App: React.FC = () => {
  const expenseCategoryCache = new ExpenseCategoryCache();  
  try{    
    expenseCategoryCache.GetExpenseCategories()
  }
  catch{

  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome To Your Personal Expense Tracker
        </p>
      </header>
      <div>
      <ExpenseGrid expenseCategoriesCache={expenseCategoryCache}/>
    </div>
    <div>
      <ExpenseCategoryList/>
    </div>
    <div>
      <AddExpenseForm/><AddExpenseCategoryForm/>
    </div>
    </div>  
    );
}

export default App;
