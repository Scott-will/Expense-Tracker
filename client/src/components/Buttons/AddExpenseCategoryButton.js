import React, { useState } from 'react'

const AddExpenseCategoryButton = () => {

  const [category, setCategory] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddItem = async () => {
    if (!category) {
      setError('Input cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://localhost:5000/api/expenseCategoriesController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }), // Replace with your item data
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccess(true);
      console.log('Item added:', data); // You can handle the response as needed
    } catch (err) {
      setError(err.message);
      console.error('Error adding item:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowInput(true)}>
        Add Item
      </button>
      
      {showInput && (
        <div>
          <input
            type="text"
            value={category}
            onChange={handleInputChange}
            placeholder="Enter item name"
          />
          <button onClick={handleAddItem} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setShowInput(false)}>Cancel</button>
        </div>
      )}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Item added successfully!</p>}
    </div>
  );
}

export default AddExpenseCategoryButton;