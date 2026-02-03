const todoList = JSON.parse(localStorage.getItem('todoList')) || [
  {
    task: 'make dinner', 
    dueDate: '2026-02-03'
  }, 

  {
    task: 'wash dishes', 
    dueDate: '2026-02-03'
  }
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = ``;

  todoList.forEach((todoObject, index) => {
    const { task, dueDate } = todoObject;

    let html = `
      <div>${task}</div>

      <div>${dueDate}</div>

      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);

        renderTodoList();

        saveToStorage();
      });
    });
};


function addTodo() {
  const taskInputElement = document.querySelector('.js-task-input');
  const dueDateInputElement = document.querySelector('.js-due-date-input');

  const task = taskInputElement.value;
  const dueDate = dueDateInputElement.value;

  todoList.push(
    {
      task, 
      dueDate
    }
  );

  taskInputElement.value = '';
  dueDateInputElement.value = '';

  renderTodoList();

  saveToStorage();
};


function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};


document.querySelector('.add-todo-button')
  .addEventListener('click', () => {
    addTodo();
});