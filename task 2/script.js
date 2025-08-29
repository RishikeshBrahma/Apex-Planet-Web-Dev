// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- FORM VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent the default form submission
            event.preventDefault();
            
            // Perform validation
            const isNameValid = validateRequired(nameInput);
            const isEmailValid = validateEmail(emailInput);
            const isMessageValid = validateRequired(messageInput);

            // If all fields are valid, you can proceed with form submission
            if (isNameValid && isEmailValid && isMessageValid) {
                alert('Form submitted successfully!');
                contactForm.reset(); // Clear the form
                clearAllErrors();
            }
        });
    }

    // Function to show an error message for a given field
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        input.classList.add('invalid');
        errorElement.textContent = message;
    }

    // Function to clear an error message
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        input.classList.remove('invalid');
        errorElement.textContent = '';
    }
    
    // Function to clear all error messages on successful submission
    function clearAllErrors() {
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            clearError(input);
        });
    }

    // Validation for required fields
    function validateRequired(input) {
        if (input.value.trim() === '') {
            showError(input, `${input.name} is required.`);
            return false;
        }
        clearError(input);
        return true;
    }

    // Validation for email format using a regular expression
    function validateEmail(input) {
        if (!validateRequired(input)) {
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            showError(input, 'Please enter a valid email address.');
            return false;
        }
        clearError(input);
        return true;
    }


    // --- TO-DO LIST ---
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the new list item
        const li = document.createElement('li');
        
        // Create the task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        // Append elements to the list item
        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        // Add the new list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }

    // Allow adding tasks by pressing Enter
    if (taskInput) {
        taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }

    // Use event delegation to handle clicks on delete buttons and task completion
    if (taskList) {
        taskList.addEventListener('click', (event) => {
            // Check if a delete button was clicked
            if (event.target.classList.contains('delete-btn')) {
                const li = event.target.parentElement;
                taskList.removeChild(li);
            }
            
            // Check if a task item (but not the button) was clicked
            if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN') {
                 const li = event.target.closest('li');
                 li.classList.toggle('completed');
            }
        });
    }
});
