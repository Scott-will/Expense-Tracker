import React, { useState } from 'react';
import ExpenseList from './components/Expenses';
import AddExpenseCategoryButton from './components/Buttons/AddExpenseCategoryButton';

export default function App(){
    return (
        <div>
    <div>
        <ExpenseList/>
    </div>
    <div>
        <AddExpenseCategoryButton/>
    </div>
    </div>);
}

