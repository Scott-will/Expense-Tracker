import React, {useState, useEffect} from 'react'
import { ExpenseCategoriesApi, ExpenseCategory } from '../apiClient';

const ExpenseCategoryList = () => {

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

  return(
    <div>
        {expenseCategories?.map(function(d){
            return (<li key={d.Category}>{d.Category}</li>)
       })}
    </div>
  )
}

export default ExpenseCategoryList;