import React, {useState, useEffect} from 'react'
import { ExpensesApi, Expense } from '../apiClient'
import { Table, THead, TH, TR, TD } from '../styles/ExpenseGrid.style';
import ExpenseCategoryCache from '../cache/ExpenseCategoriesCache';

interface ExpenseGridProps{
  expenseCategoriesCache: ExpenseCategoryCache
}

const ExpenseGrid: React.FC<ExpenseGridProps> = ({expenseCategoriesCache}) => {
   const [expenseState, setExpenseState] = useState<Expense[]>();
   const [selectedRows, setSelectedRows] = useState(new Set<number|undefined>());
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

const handleRowClick = (expenseId : number | undefined) =>{
  if(!expenseId){
    return;
  }
  setSelectedRows((prevSelected) =>{
    const newSelected = new Set(prevSelected);
    if(newSelected.has(expenseId)){
      newSelected.delete(expenseId);
    }
    else{
      newSelected.add(expenseId);
    }
    return newSelected;
  })
}

async function DeleteExpenses(){
  const api = new ExpensesApi();
  const promises = Array.from(selectedRows).map(async (item) => {
    try {
      if(!item){
        return;
      }
      const response = await api.deleteExpense(item);
    } catch (error) {
      console.error("Error fetching expense categories:", error);
      // Optionally set an error state or display a message to the user
    }
  })
  await Promise.all(promises);   
}
  return(
    !expenseState || expenseState.length == 0 ? 
    <p>No Data To Show</p> :
    <div>
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
          <TR key={row.CategoryId} 
          onClick = {() => handleRowClick(row.Id)}
          style={{backgroundColor : selectedRows.has(row.Id) ? '#e0f7fa' : 'transparent',
            cursor : 'pointer'
          }}>
            <TD>{expenseCategoriesCache.cache.get(Number(row.CategoryId))?.Category }</TD>
            <TD>{row.Amount}</TD>
            <TD>{row.Date}</TD>
            <TD>{row.Description}</TD>
          </TR>
        ))}
      </tbody>
    </Table>
    {selectedRows.size > 0 && ( // Conditionally render the button
      <div style={{ marginTop: '20px' }}>
        <button onClick={DeleteExpenses}>
          Delete Expenses
        </button>
      </div>
    )}
    </div>
)
}

export default ExpenseGrid