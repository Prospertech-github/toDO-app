// Storing the tasks
let tasks = [];

// Element capturing/selection
let taskInput = document.querySelector("#task_title");
let form = document.querySelector(".form");
let taskContainer = document.querySelector(".tasks-container");

// Handling the form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let taskName = taskInput.value;

  // Calling the  add task function with the input value
  addTask(taskName);
});

// Defining the Add Task function
function addTask(task) {
  // pushing the task object to the tasks array
  tasks.push({
    id: Date.now(),
    isDone: false,
    taskName: task,
  });
  //empty the input element
  taskInput.value = "";
  //emptying the tasks container before showing the tasks
  taskContainer.innerHTML = "";
  // displaying the tasks by calling the show Tasks function
  showTasks();
}

//Defining the Show Task function
function showTasks() {
  //using the ForEach method to loop through the tasks array and displaying the task
  tasks.forEach(function (task) {
    // Creating HTML elements dynamically and inserting into the Task container
    taskContainer.insertAdjacentHTML(
      "afterbegin",
      `
            <div id=${task.id} class="tasks">
                <p class="${task.isDone == true ? "line-through" : ""}"> ${
        task.taskName
      } </p>
                ${
                  task.isDone === true
                    ? '<a href="#" class="primary-btn undo-btn"> Undo </a>'
                    : '<a href="#" class="primary-btn done-btn"> Done </a>'
                }
                <a href="#" class="primary-btn edit-btn"> Edit </a>
                <a href="#" class="primary-btn delete-btn"> Delete </a>
            </div>   
        `
    );
  });
}

// Defining the update Task to edit tasks
function updateTaskName(key, newName) {
  const index = tasks.findIndex((task) => task.id == key);
  tasks[index] = {
    ...tasks[index],
    taskName: newName,
  };

  taskContainer.innerHTML = "";
  showTasks();
}

// Defining the delet task function
function deleteTask(key) {
  const index = tasks.findIndex((task) => task.id == key);

  //using the array.splice method to remove/delete a task
  tasks.splice(index, 1);

  taskContainer.innerHTML = "";
  showTasks();
}

// Defining the function that handles setting tasks to Done
function taskDone(key) {
  const index = tasks.findIndex((task) => task.id == key);

  // updating the task by copying the task details and changing only the isDone property
  tasks[index] = {
    ...tasks[index],
    isDone: true,
  };

  taskContainer.innerHTML = "";
  showTasks();
}

// Defining the function that changes tasks to undone
function undoTask(key) {
  const index = tasks.findIndex((task) => task.id == key);

  // updating the task by copying the task details and changing only the isDone property
  tasks[index] = {
    ...tasks[index],
    isDone: false,
  };

  taskContainer.innerHTML = "";
  showTasks();
}

// Listening to the click event on the done button
taskContainer.addEventListener("click", function (event) {
  // Checking IF the element clicked is the done button and bears the 'done-btn' class
  if (event.target.className.split(" ")[1] == "done-btn") {
    // capturing the task container id and assigning it to a key variable
    const key = event.target.parentElement.id;
    taskDone(key);
  }
});

// Listening to the click event on the delete button
taskContainer.addEventListener("click", function (event) {
  // Checking IF the element clicked is the delete button and bears the 'delete-btn' class
  if (event.target.className.split(" ")[1] == "delete-btn") {
    // capturing the task container id and assigning it to a key variable
    const key = event.target.parentElement.id;
    deleteTask(key);
  }
});

// Listening to the click event on the undo button
taskContainer.addEventListener("click", function (event) {
  // Checking IF the element clicked is the undo button and bears the 'undo-btn' class
  if (event.target.className.split(" ")[1] == "undo-btn") {
    // capturing the task container id and assigning it to a key variable
    const key = event.target.parentElement.id;
    undoTask(key);
  }
});

// Listening to the click event on the edit button
taskContainer.addEventListener("click", function (event) {
  // Checking IF the element clicked is the edit button and bears the 'edit-btn' class
  if (event.target.className.split(" ")[1] == "edit-btn") {
    // capturing the task container id and assigning it to a key variable
    const key = event.target.parentElement.id;

    // Using a prompt to receive the new task name from the user 
    let newTaskName = prompt("What is the new Task Name?");

    // Error checking to ensure that users dont send empty values as new task Name
    if (newTaskName.trim == "") return;

    // Calling the update function with the key and the new taskName
    updateTaskName(key, newTaskName);
  }
});