var todos = [];
var taskContainer = document.querySelector('.tasks-container');
var form = document.querySelector('.form');
var formInput = document.querySelector('#task_title');


const addTodo = (todo) => {
  const task = todos.find(taskItem => taskItem.todo == todo);
  if (task) {
    alert("Task already existing");
    return;
  }
  
  todos.push({
    key: todo + Date.now(),
    isDone: false,
    todo
  });
  
 
  showTodos();
  formInput.value = '';
}

const deleteTodo = (key) => {
  const index = todos.findIndex(taskItem => taskItem.key == key);
  todos.splice(index, 1);
  taskContainer.innerHTML = '';
  showTodos();
  formInput.value = '';
}

const updateTodoText = (key, todo) => {
  const task = todos.find(taskItem => taskItem.todo == todo);
  if (task) {
    alert("Task already existing");
    return;
  }
  const index = todos.findIndex(taskItem => taskItem.key == key);
  todos[index] = {
    ...todos[index],
    todo
  };
  taskContainer.innerHTML = '';
  showTodos();
  formInput.value = '';
}

const taskIsDone = (key) => {
  const index = todos.findIndex(taskItem => taskItem.key == key);
  todos[index] = {
    ...todos[index],
    isDone: true
  };
  taskContainer.innerHTML = '';
  showTodos();
}

const taskUndo = (key) => {
  const index = todos.findIndex(taskItem => taskItem.key == key);
  todos[index] = {
    ...todos[index],
    isDone: false
  };
  taskContainer.innerHTML = '';
  showTodos();
}

const showTodos = () => {
  todos.forEach((el) => taskContainer.insertAdjacentHTML('afterbegin', `
      <div id="${el.key}" class="tasks">
        <p class="${el.isDone == true ? "line-through" : ""}"> ${el.todo} </p>
        ${el.isDone == true ? '<a href="#" class="primary-btn undo-btn"> Undo </a>' : '<a href="#" class="primary-btn done-btn"> Done </a>'}
        <a href="#" class="primary-btn edit-btn"> Edit </a>
        <a href="#" class="primary-btn delete-btn"> Delete </a>

      </div>
    `)
  )
}



form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formInput.value.trim() == '') {
    return
  } else {
    addTodo(formInput.value);
  }
  
})

taskContainer.addEventListener('click', (event) => {
  if (event.target.className.split(' ')[1] == 'delete-btn') {
    const key = event.target.parentElement.id;
    deleteTodo(key);
  }
});

taskContainer.addEventListener('click', (event) => {
  if (event.target.className.split(' ')[1] == 'done-btn') {
    const key = event.target.parentElement.id;
    taskIsDone(key);
  }
});

taskContainer.addEventListener('click', (event) => {
  if (event.target.className.split(' ')[1] == 'undo-btn') {
    const key = event.target.parentElement.id;
    taskUndo(key);
  }
});

taskContainer.addEventListener('click', (event) => {
  if (event.target.className.split(' ')[1] == 'edit-btn') {
    const key = event.target.parentElement.id;
    var todo = prompt("Insert task to update");
    if (todo.trim() == '') return;
    updateTodoText(key, todo);
  }
});
