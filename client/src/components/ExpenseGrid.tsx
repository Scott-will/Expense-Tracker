import React, {useState, useEffect} from 'react'
import { ExpensesApi, Expense } from '../apiClient'
import { Table, THead, TH, TR, TD } from '../styles/ExpenseGrid.style';
import ExpenseCategoryCache from '../cache/ExpenseCategoriesCache';

interface ExpenseGridProps{
  expenseCategoriesCache: ExpenseCategoryCache
}

const ExpenseGrid: React.FC<ExpenseGridProps> = ({expenseCategoriesCache}) => {
   const [expenseState, setExpenseState] = useState<Expense[]>();
   useEffect(() =>{
    getExpenses();
  }, []);

  async function getExpenses(){
    const api = new ExpensesApi();
    const response = await api.getExpenses();
    setExpenseState(response.data);
  }

  function SortAlphabetically(column : keyof Expense) : Expense[] | undefined{
    if(expenseState){
      const dataToSort = [...expenseState];
      dataToSort.sort((a: Expense, b: Expense) => {
        const aValue = a[column];
        const bValue = b[column];

        // Ensure both values are strings for localeCompare
        return String(aValue).localeCompare(String(bValue));
    });
      return dataToSort;
    }
    return undefined;
   
}

function SortByDate(column : keyof Expense) : Expense[] | undefined{
  if(expenseState){
    const dataToSort = [...expenseState];
    dataToSort.sort((a: Expense, b: Expense) => {
      const aValue = String(a[column]);
      const bValue = String(b[column]);

      // Convert values to Date if they're strings
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);

      return aDate.getDate() - bDate.getDate(); // Sort in ascending order
  });
  return dataToSort;
  }
  return undefined;    
}

function SortByAmount(column : keyof Expense) : Expense[] | undefined{
  if(expenseState){
    const dataToSort = [...expenseState];
    dataToSort.sort((a: Expense, b: Expense) => {
      const aValue = Number(a[column]);
      const bValue = Number(b[column]);

      return aValue >  bValue ? 1 : -1; // Sort in ascending order
  });
    return dataToSort;
  }
  return undefined;
    
}

  return(
    !expenseState || expenseState.length == 0 ? 
    <p>No Data To Show</p> :
    <Table>
      <THead>
        <TR>
          <TH onClick={() => setExpenseState(SortByAmount('CategoryId'))}>Category</TH>
          <TH onClick={() => setExpenseState(SortByAmount('Amount'))}>Amount</TH>
          <TH onClick={() => setExpenseState(SortByDate('Date'))}>Date</TH>
          <TH>Description</TH>
        </TR>
      </THead>
      <tbody>
        {expenseState?.map(row => (
          <TR key={row.CategoryId}>
            <TD>{expenseCategoriesCache.cache.get(Number(row.CategoryId))?.Category }</TD>
            <TD>{row.Amount}</TD>
            <TD>{row.Date}</TD>
            <TD>{row.Description}</TD>
          </TR>
        ))}
      </tbody>
    </Table>
  )
}

export default ExpenseGrid