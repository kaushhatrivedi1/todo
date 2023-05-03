// // const todoForm = document.getElementById("todo-form");
// // const todoInput = document.getElementById("todo-input");
// // const todoInput1 = document.getElementById("todo-input1");
// // const todoList = document.getElementById("todo-list");

// // let todos = [];

// // // Fetch all todos from the server
// // fetch("http://localhost:3000/api/tasks")
// //   .then((response) => response.json())
// //   .then((data) => {
// //     todos = data;
// //     renderTodos();
// //   })
// //   .catch((error) => console.error(error));

// // // Add event listener to the form submit event
// // todoForm.addEventListener("submit", (event) => {
// //   event.preventDefault();

// //   // Get the value of the input field
// //   const todoText = todoInput.value;
// //   const todoText1 = todoInput1.value;

// //   // Create a new todo object and add it to the list
// //   const newTodo = { title: todoText, description: todoText1 };
// //   fetch("/api/tasks", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(newTodo),
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       todos.push(data);
// //       renderTodos();
// //       todoInput.value = "";
// //     })
// //     .catch((error) => console.error(error));
// // });

// // // Add event listener to the todo item checkbox change event
// // todoList.addEventListener("change", (event) => {
// //   const todoId = event.target.dataset.todoId;
// //   const completed = event.target.checked;

// //   // Find the todo in the list and update its completed status
// //   const todo = todos.find((t) => t._id === todoId);
// //   if (todo) {
// //     todo.completed = completed;
// //     fetch(`/api/tasks/${todoId}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(todo),
// //     })
// //       .then((response) => response.json())
// //       .then((data) => renderTodos())
// //       .catch((error) => console.error(error));
// //   }
// // });

// // // Add event listener to the todo item delete button click event
// // todoList.addEventListener("click", (event) => {
// //   const todoId = event.target.dataset.todoId;

// //   // Remove the todo from the list
// //   todos = todos.filter((t) => t._id !== todoId);

// //   // Remove the todo from the server
// //   fetch(`/api/tasks/${todoId}`, { method: "DELETE" })
// //     .then((response) => response.json())
// //     .then((data) => renderTodos())
// //     .catch((error) => console.error(error));
// // });

// // // Render the todos on the page
// // function renderTodos() {
// //   todoList.innerHTML = "";
// //   todos.forEach((todo) => {
// //     const todoItem = document.createElement("li");
// //     todoItem.classList.add("todo-item");
// //     if (todo.completed) {
// //       todoItem.classList.add("completed");
// //     }

// //     const todoCheckbox = document.createElement("input");
// //     todoCheckbox.type = "checkbox";
// //     todoCheckbox.checked = todo.completed;
// //     todoCheckbox.dataset.todoId = todo._id;

// //     const todoText = document.createElement("span");
// //     todoText.classList.add("todo-text");
// //     todoText.innerText = todo.text;

// //     const todoDeleteButton = document.createElement("button");
// //     todoDeleteButton.classList.add("todo-delete-button");
// //     todoDeleteButton.dataset.todoId = todo._id;
// //     todoDeleteButton.innerText = "Delete";

// //     todoItem.appendChild(todoCheckbox);
// //     todoItem.appendChild(todoText);
// //     todoItem.appendChild(todoDeleteButton);

// //     todoList.appendChild(todoItem);
// //   });
// // }


// // select the DOM elements
// const taskForm = document.querySelector('#task-form');
// const taskList = document.querySelector('#task-list');
// const taskTitle = document.querySelector('#title');
// const taskDescription = document.querySelector('#description');

// // add event listener to the form
// taskForm.addEventListener('submit', addTask);

// // function to add task
// async function addTask(event) {
//   event.preventDefault();

//   const title = taskTitle.value;
//   const description = taskDescription.value;

//   try {
//     const response = await fetch('/api/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         title,
//         description
//       })
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create task');
//     }

//     const task = await response.json();
//     taskList.innerHTML += `<li>${task.title} - ${task.description}</li>`;
//     taskTitle.value = '';
//     taskDescription.value = '';
//   } catch (error) {
//     console.error(error);
//   }
// }

// // function to get all tasks
// async function getTasks() {
//   try {
//     const response = await fetch('/api/tasks');
//     const tasks = await response.json();
//     tasks.forEach(task => {
//       taskList.innerHTML += `<li>${task.title} - ${task.description}</li>`;
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// // call the getTasks function on page load
// getTasks();


const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('description');
  
  const data = { title, description };
  
  const response = await fetch('/api/tasks/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    console.log('Task created successfully');
  } else {
    console.error('Error creating task:', response.status);
  }
});
