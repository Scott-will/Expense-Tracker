const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Fetch all expenses and render them
async function fetchExpenses() {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();
    renderExpenses(expenses);
}

// Render expenses to the DOM
function renderExpenses(expenses) {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description} - $${expense.amount}</span>
            <button onclick="deleteExpense(${expense.Id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Add a new expense
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;

    await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, amount })
    });

    expenseForm.reset();
    fetchExpenses(); // Refresh the list
});

// Delete an expense
async function deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
    });

    fetchExpenses(); // Refresh the list
}

// Initial fetch
fetchExpenses();
