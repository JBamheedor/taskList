// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEvenetListeners();

function loadEvenetListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task events
    clearBtn.addEventListener('click', clearTasks);
    //Filter task events
    filter.addEventListener('keyup', filterTasks);
}
//Get tasks from local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('div');
        //Add Class
        li.className = 'chip';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}
//Add task function
function addTask(e) {
    if(taskInput.value === '') {
        alert('You need to add a task');
        return false;
    }
    //Create li element
    const li = document.createElement('div');
    //Add Class
    li.className = 'chip';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove" id="x"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    // Store local storage
    storeTaskInLocalStorage(taskInput.value);

    // //Clear Input
    taskInput.value = '';
    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();

        //Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.chip').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}