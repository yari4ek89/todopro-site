const addTask = document.querySelector('.add-task');
const taskInput = document.querySelector('#input-task');
const prioritySelect = document.querySelector('#select-priority');
const tasksContainer = document.querySelector('.tasks');
const filterSelect = document.querySelector('#filter');
const searchInput = document.querySelector('#search-bar');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Validate search bar
function searchValidation() {
    if (searchInput.value === '') {
        return alert('Please fill out the search bar');
    } else {
        searchTask();
    }
}

// Task validation
function formValidation() {
    if (taskInput.value.trim() === '') alert('Please fill out the task field!');
    else addNewTask();
}

// Render tasks
function renderTasks(task = 0) {
    if (task === 0) {
        tasksContainer.innerHTML = '';

        tasks.forEach((task, index) => {
            // Create a container for task
            const taskEl = document.createElement('div');
            taskEl.classList.add('task');
            switch (task.priority) {
                case 'completed':
                case 'low': {
                    taskEl.style.backgroundColor = 'green';
                    break;
                }
                case 'medium': {
                    taskEl.style.backgroundColor = 'yellow';
                    break;
                }
                case 'high': {
                    taskEl.style.backgroundColor = 'red';
                    break;
                }
            }

            // Create priority
            const priorityEl = document.createElement('p');
            priorityEl.textContent = task.priority;

            // Create caption
            const captionEl = document.createElement('input');
            captionEl.value = task.task;
            captionEl.style.minHeight = '3rem';
            captionEl.disabled = true;
            captionEl.classList.add('caption-input');

            // Create date
            const dateEl = document.createElement('p');
            dateEl.textContent = task.date;
            dateEl.classList.add('date');

            // Create checkbox
            const checkButton = document.createElement('input');
            checkButton.type = 'checkbox';
            checkButton.checked = task.isCompleted;
            checkButton.addEventListener('change', e => {
                if (task.isCompleted) {
                    taskEl.style.backgroundColor = 'green';
                    priorityEl.textContent = 'low';
                    task.priority = 'low';
                    task.isCompleted = false;
                    saveTasks();
                } else {
                    taskEl.style.backgroundColor = 'green';
                    priorityEl.textContent = 'completed';
                    task.priority = 'completed';
                    task.isCompleted = true;
                    saveTasks();
                }
            });

            // Create a div for buttons
            const controllerDiv = document.createElement('div');
            controllerDiv.classList.add('controller');

            // Create an Edit button
            const editTaskEl = document.createElement('button');
            editTaskEl.textContent = 'EDIT';
            editTaskEl.style.maxHeight = '2rem';
            editTaskEl.style.alignSelf = 'center';
            editTaskEl.style.marginRight = '0rem';
            editTaskEl.addEventListener('click', () => editTask(index, captionEl));

            // Create a Delete button
            const deleteTaskEl = document.createElement('button');
            deleteTaskEl.textContent = 'DELETE';
            deleteTaskEl.style.maxHeight = '2rem';
            deleteTaskEl.style.alignSelf = 'center';
            deleteTaskEl.addEventListener('click', () => deleteTask(index));

            controllerDiv.appendChild(editTaskEl);
            controllerDiv.appendChild(deleteTaskEl);

            taskEl.appendChild(checkButton);
            taskEl.appendChild(priorityEl);
            taskEl.appendChild(captionEl);
            taskEl.appendChild(dateEl);
            taskEl.appendChild(controllerDiv);

            tasksContainer.appendChild(taskEl);
        });
    } else {
        // Create a container for task
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');
        switch (task.priority) {
            case 'completed':
            case 'low': {
                taskEl.style.backgroundColor = 'green';
                break;
            }
            case 'medium': {
                taskEl.style.backgroundColor = 'yellow';
                break;
            }
            case 'high': {
                taskEl.style.backgroundColor = 'red';
                break;
            }
        }

        // Create priority
        const priorityEl = document.createElement('p');
        priorityEl.textContent = task.priority;

        // Create caption
        const captionEl = document.createElement('input');
        captionEl.value = task.task;
        captionEl.style.minHeight = '3rem';
        captionEl.disabled = true;
        captionEl.classList.add('caption-input');

        // Create date
        const dateEl = document.createElement('p');
        dateEl.textContent = task.date;
        dateEl.classList.add('date');

        // Create checkbox
        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';
        checkButton.checked = task.isCompleted;
        checkButton.addEventListener('change', e => {
            if (task.isCompleted) {
                taskEl.style.backgroundColor = 'green';
                priorityEl.textContent = 'low';
                task.priority = 'low';
                task.isCompleted = false;
                saveTasks();
            } else {
                taskEl.style.backgroundColor = 'green';
                priorityEl.textContent = 'completed';
                task.priority = 'completed';
                task.isCompleted = true;
                saveTasks();
            }
        });

        // Create a div for buttons
        const controllerDiv = document.createElement('div');
        controllerDiv.classList.add('controller');

        // Create an Edit button
        const editTaskEl = document.createElement('button');
        editTaskEl.textContent = 'EDIT';
        editTaskEl.style.maxHeight = '2rem';
        editTaskEl.style.alignSelf = 'center';
        editTaskEl.style.marginRight = '0rem';
        editTaskEl.addEventListener('click', () => editTask(index, captionEl));

        // Create a Delete button
        const deleteTaskEl = document.createElement('button');
        deleteTaskEl.textContent = 'DELETE';
        deleteTaskEl.style.maxHeight = '2rem';
        deleteTaskEl.style.alignSelf = 'center';
        deleteTaskEl.addEventListener('click', () => deleteTask(index));

        controllerDiv.appendChild(editTaskEl);
        controllerDiv.appendChild(deleteTaskEl);

        taskEl.appendChild(checkButton);
        taskEl.appendChild(priorityEl);
        taskEl.appendChild(captionEl);
        taskEl.appendChild(dateEl);
        taskEl.appendChild(controllerDiv);

        tasksContainer.appendChild(taskEl);
    }
}

// Filter ALL-ACTIVE-COMPLETED
function filterSearch() {
    switch (filterSelect.value) {
        case 'all': {
            renderTasks();
            break;
        }
        case 'active': {
            tasksContainer.innerHTML = '';

            tasks.forEach(task => {
                if (!task.isCompleted) renderTasks(task);
            });
            break;
        }
        case 'completed': {
            tasksContainer.innerHTML = '';

            tasks.forEach(task => {
                if (task.isCompleted) renderTasks(task);
            });
            break;
        }
    }
}

// Filter to default
function filterToDefault() {
    filterSelect.value = 'all';
    filterSearch();
}

// Get date now in format 'mm/dd/yyyy'
function dateNow() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

// Add new task
function addNewTask() {
    // Trimming
    const taskValue = taskInput.value.trim();
    const priorityValue = prioritySelect.value;
    const date = dateNow();

    // Tasks saving and rendering
    tasks.push({ task: taskValue, priority: priorityValue, date: date, isCompleted: false });

    saveTasks();
    renderTasks();
    filterToDefault();

    // Resetting inputs
    taskInput.value = '';
    prioritySelect.value = 'low';
}

// Edit task function
function editTask(index, captionEl) {
    // Disable or enable task
    captionEl.disabled = !captionEl.disabled;

    // Check if enabled
    if (captionEl.disabled) {
        if (captionEl.value === '') {
            alert('Please fill out the task field!');
        } else {
            tasks[index].task = captionEl.value;
            saveTasks();
            renderTasks();
        }
    }
}

// Delete task function
function deleteTask(index) {
    // Delete task at index then save tasks and render
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Search function
function searchTask() {
    // Trimming values
    const searchTarget = searchInput.value.trim().toLowerCase();

    // Render new
    renderTasks();

    // Check notes
    tasks.forEach((task) => {
        if (task.task.trim().toLowerCase() === searchTarget) {
            console.log('hello');
            document.querySelectorAll('.task').forEach((taskEl) => {
                taskEl.querySelectorAll('input').forEach(input => {
                    if (input.value.trim().toLowerCase() === searchTarget) {
                        taskEl.scrollIntoView();
                        input.classList.add('input-found');
                        searchInput.value = '';
                    }
                });
            });
        }
    });
}

addTask.addEventListener('click', () => formValidation());
filterSelect.addEventListener('change', () => filterSearch());
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchValidation();
})

renderTasks();