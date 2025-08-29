document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary elements from the DOM
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const saveButton = document.getElementById('save-button');

    // --- Data Functions ---
    const getTasks = () => {
        const tasksString = localStorage.getItem('tasks') || '[]';
        return JSON.parse(tasksString);
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // --- Rendering Function ---
    const renderTasks = () => {
        const tasks = getTasks();
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = '<p style="text-align: center; color: #888;">Your task list is empty.</p>';
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.dataset.id = task.id;

            // Container for text and timestamp
            const contentDiv = document.createElement('div');
            contentDiv.className = 'task-item-content';

            const spanText = document.createElement('span');
            spanText.className = 'task-text';
            spanText.textContent = task.text;

            // Create and format the timestamp
            const spanTimestamp = document.createElement('span');
            spanTimestamp.className = 'task-timestamp';
            const taskDate = new Date(task.createdAt);
            spanTimestamp.textContent = `Added: ${taskDate.toLocaleDateString()} ${taskDate.toLocaleTimeString()}`;

            contentDiv.appendChild(spanText);
            contentDiv.appendChild(spanTimestamp);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '✖';

            li.appendChild(contentDiv);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    // --- Event Listeners ---
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const tasks = getTasks();
            const newTask = {
                id: Date.now(),
                text: taskText,
                createdAt: new Date() // Add timestamp on creation
            };
            tasks.push(newTask);
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const li = event.target.parentElement;
            const taskId = Number(li.dataset.id);

            // Add fade-out animation class
            li.classList.add('fade-out');

            // Wait for the animation to finish before removing the task
            setTimeout(() => {
                let tasks = getTasks();
                tasks = tasks.filter(task => task.id !== taskId);
                saveTasks(tasks);
                renderTasks();
            }, 400); // This duration should match the CSS animation time
        }
    });

    // Event listener for the "Save to File" button
    saveButton.addEventListener('click', () => {
        const tasks = getTasks();
        if (tasks.length === 0) {
            alert("Your task list is empty. There's nothing to save!");
            return;
        }

        // Convert the tasks array to a JSON string
        const dataToSave = JSON.stringify(tasks, null, 2); // The '2' makes the JSON file readable
        
        // Create a Blob (a file-like object)
        const blob = new Blob([dataToSave], { type: 'application/json' });
        
        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor (<a>) element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json'; // The default filename for the download
        
        // Programmatically click the anchor to start the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up by removing the temporary URL and anchor
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // --- Initial Load ---
    renderTasks();
});