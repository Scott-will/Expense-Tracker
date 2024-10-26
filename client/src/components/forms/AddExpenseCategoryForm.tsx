import React, {useState} from 'react'

import { ExpenseCategoriesApi, ExpenseCategory } from '../../apiClient'

const AddExpenseCategoryForm: React.FC = () => {
    const [isFormVisible, setFormVisible] = useState(false)
    const [category, setCategoryValue] = useState('')

    const handleOpenForm = () => {
        setFormVisible(true)
    };

    const handleCloseForm = () =>{
        setFormVisible(false);
        setCategoryValue('')
    };

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault()
      try {
        const api = new ExpenseCategoriesApi();
        const expenseCategory : ExpenseCategory = {'Category': category}
        const response = await api.addExpenseCategory(expenseCategory);
        if(response.status == 201){
          console.log("api success");
        }
      }
      catch (error) {
        console.error('Error expense category item:', error);
      }
    }

    return (
        <div>
            <button onClick = {handleOpenForm}>Add Expense Category</button>
            {isFormVisible &&(
                <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="category">Expense Category:</label>
                    <input
                      id="category"
                      type="text"
                      value={category}
                      onChange={(e) => setCategoryValue(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleCloseForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>
    );

}

export default AddExpenseCategoryForm