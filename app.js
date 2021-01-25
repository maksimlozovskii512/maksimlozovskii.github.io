//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const inputValidation = document.getElementById("todoInput");
const warningMsgBlock = document.getElementById("warning-msg-block");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
filterOption.addEventListener("click", filterTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions

function addTodo(event) {
  //prevents form from submitting
  event.preventDefault();

  //Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value.trim(); //.trim removes blank space at the start and end of the todo text

  //VALIDATION
  if (newTodo.innerText.length === 0) {
    inputValidation.style.borderBottom = "2px solid red";
    inputValidation.style.height = "3.29rem";

    warningMsgBlock.innerHTML = `<div class="warning-msg-text">Cannot Add Blank To-Do Item</div>`; //Adds warning message if the todo name is empty
    return;
  }
  warningMsgBlock.innerHTML = ``; //No warning message
  inputValidation.style.borderBottom = "2px solid green";
  inputValidation.style.height = "3.29rem";

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  //"Completed" Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class = "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //"Remove" Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list
  todoList.appendChild(todoDiv);

  //clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //DELETE
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECKMARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//LOCAL STORAGE SAVE

function saveLocalTodos(todo) {
  //Check---Hey do i already have things in here?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //Check---Hey do i already have things in here?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //Check---Hey do i already have things in here?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
