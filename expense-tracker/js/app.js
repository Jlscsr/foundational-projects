// Get DOM elements
const expenseForm = document.getElementById('expenseForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');

// Store expenses in an array
let expenses = [];

// Load expenses from localStorage when page loads
function loadExpenses() {
    try {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            expenses = JSON.parse(savedExpenses);
        }
    } catch (err) {
        console.log('Could not load saved expenses:', err);
    }
    displayExpenses();
    updateTotal();
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error-input');
}

// Clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    const errorInputs = document.querySelectorAll('.error-input');
    
    errorMessages.forEach(error => error.remove());
    errorInputs.forEach(input => input.classList.remove('error-input'));
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    // Form validation
    clearErrors();
    let isValid = true;

    if (!description) {
        showError('description', 'Please enter what you spent money on');
        isValid = false;
    }

    if (!amount || amount <= 0) {
        showError('amount', 'Amount should be more than 0');
        isValid = false;
    }

    if (!category) {
        showError('category', 'Pick a category from the list');
        isValid = false;
    }

    if (!isValid) return;

    // Create new expense
    const expense = {
        id: Date.now().toString(),
        description: description,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    };

    // Add to expenses array
    expenses.push(expense);

    // Save to localStorage
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (err) {
        console.log('Could not save expense:', err);
    }

    // Update display
    displayExpenses();
    updateTotal();
    expenseForm.reset();
}

// Delete expense
function deleteExpense(expenseId) {
    expenses = expenses.filter(expense => expense.id !== expenseId);
    
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (err) {
        console.log('Could not save after delete:', err);
    }
    
    displayExpenses();
    updateTotal();
}

// Display expenses list
function displayExpenses() {
    expensesList.innerHTML = expenses.map(expense => `
        <li class="expense-item">
            <div class="expense-info">
                <div>${expense.description}</div>
                <div class="expense-category">${expense.category}</div>
            </div>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
            <button onclick="deleteExpense('${expense.id}')" class="delete-btn">Delete</button>
        </li>
    `).join('');
}

// Update total amount
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Add event listener to form
expenseForm.addEventListener('submit', handleFormSubmit);

// Load expenses when page loads
document.addEventListener('DOMContentLoaded', loadExpenses);