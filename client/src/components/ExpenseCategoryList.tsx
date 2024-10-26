import React, {useState, useEffect} from 'react'
import { ExpenseCategoriesApi, ExpenseCategory } from '../apiClient';
const ExpenseCategoryList = () => {

const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>();
const [selectedCategories, setSelectedCategories] = useState(new Set<ExpenseCategory>());

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

  const toggleSelectCategory = (category : ExpenseCategory) => {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(category)) {
        newSelected.delete(category); // Deselect if already selected
      } else {
        newSelected.add(category); // Select if not selected
      }
      return newSelected;
    });
  };

  const deleteSelectedCategories = async () =>{
    const api = new ExpenseCategoriesApi();
    const promises = Array.from(selectedCategories).map(async (item) => {
      try {
        if(!item.Id){
          return;
        }
        const response = await api.deleteExpenseCategory(item.Id);
      } catch (error) {
        console.error("Error fetching expense categories:", error);
        // Optionally set an error state or display a message to the user
      }
    })
    await Promise.all(promises);    
  }

  return(
    <div>
      <ul>
        {expenseCategories?.map((d) => (
          <li key={d.Category}>
            <input
              type="checkbox"
              checked={selectedCategories.has(d)}
              onChange={() => toggleSelectCategory(d)}
            />
            {d.Category}
          </li>
        ))}
      </ul>
      <button onClick={deleteSelectedCategories} disabled={selectedCategories.size === 0}>
        Delete Selected Categories
      </button>
    </div>
  )
}

export default ExpenseCategoryList;