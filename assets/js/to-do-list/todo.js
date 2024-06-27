document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((li) => {
      const taskText = li.querySelector('span').textContent;
      tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach((taskText) => {
        addTaskToDOM(taskText);
      });
    }
  }

  function addTaskToDOM(taskText) {
    const li = document.createElement("li");

    const taskTextNode = document.createElement("span");
    taskTextNode.textContent = taskText;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add('button-container')

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("button", "edit-button");
    editButton.addEventListener("click", function () {
      const newText = prompt("Edit the task:", taskText);
      if (newText !== null && newText.trim() !== "") {
        taskTextNode.textContent = newText.trim();
        saveTasks();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("button", "delete-button");
    deleteButton.addEventListener("click", function () {
      li.remove();
      saveTasks();
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    li.appendChild(taskTextNode);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  }

  loadTasks();

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      addTaskToDOM(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });
});