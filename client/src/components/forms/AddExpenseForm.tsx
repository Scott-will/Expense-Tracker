import React, { useState } from 'react'
import { ExpensesApi, Expense } from '../../apiClient'
const AdddExpenseForm: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false)
  const [category, setCategoryValue] = useState('')
  const [amount, setAmountValue] = useState(0)
  const [date, setDateValue] = useState('')
  const [description, setDescriptionValue] = useState('')

  const handleOpenForm = () => {
    setFormVisible(true)
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setCategoryValue('')
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const api = new ExpensesApi();
      const expense : Expense = {'CategoryId' : Number.parseInt(category), 'Amount' : amount, 'Date' : date, 'Description' : description}
      const response = await api.addExpense(expense);
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
      <button onClick={handleOpenForm}>Add Expense</button>
      {isFormVisible && (
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
              <label htmlFor="amount">Expense Amount:</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmountValue(Number.parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Expense Date:</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDateValue(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Expense Description:</label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescriptionValue(e.target.value)}
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

export default AdddExpenseForm