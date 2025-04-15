// Get tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask(text) {
    text = text.trim();
    if (!text) {
        throw new Error('Task cannot be empty!');
    }
    
    // Check if task already exists
    if (tasks.some(task => task.text.toLowerCase() === text.toLowerCase())) {
        throw new Error('This task already exists!');
    }
    
    tasks.push({ text, completed: false });
    saveTasks();
    displayTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Display all tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(index));
        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Handle adding new tasks
function handleAddTask() {
    const taskInput = document.getElementById('taskInput');
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        addTask(taskInput.value);
        taskInput.value = '';
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

// Set up event listeners when page loads
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTask');
    const taskInput = document.getElementById('taskInput');
    
    addTaskButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAddTask();
    });
    
    displayTasks();
});