import './App.css';
import ExpenseGrid from './components/ExpenseGrid';
import ExpenseCategoryList from './components/ExpenseCategoryList';
import React, {useState, useEffect} from 'react'

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
      <ExpenseGrid/>
    </div>
    <div>
      <ExpenseCategoryList/>
    </div>
    </div>  );
}

export default App;
