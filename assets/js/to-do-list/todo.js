document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const floatingWindow = document.getElementById("floating-window");
  let editTaskInput = document.getElementById("edit-task-input");
  let saveEditButton = document.getElementById("save-edit-button");
  let cancelEditButton = document.getElementById("cancel-edit-button");

  let currentEditingTask = null;

  if (!taskForm || !taskInput || !taskList || !floatingWindow || !editTaskInput || !saveEditButton || !cancelEditButton) {
    console.error("Um ou mais elementos cruciais não foram encontrados. Verifique os IDs no HTML.");
    return;
  }

  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
      const taskText = li.querySelector("span").textContent;
      tasks.push(taskText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
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
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("button", "edit-button");
    editButton.addEventListener("click", function () {
      showEditWindow(li, taskText);
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

  function showEditWindow(taskElement){
    currentEditingTask = taskElement;
    editTaskInput = document.getElementById("edit-task-input");
    if(!editTaskInput){
      console.error("Failed to find edit-task-input element");
      return
    }
    const taskText = taskElement.querySelector("span").textContent;
    editTaskInput.value = taskText;
    floatingWindow.classList.remove("hidden");
  }

  function hideEditWindow(){
    currentEditingTask = null;
    editTaskInput.value = "";
    floatingWindow.classList.add("hidden");
  }

  saveEditButton.addEventListener("click", function(){
    
    if(!editTaskInput){
      console.error("editTaskInput is undefined");
      editTaskInput = doucmen.getElementById("edit-task-input");
      if(!editTaskInput){
        console.error("Failed to find edit-task-input element");
        return;
      }
    }

    if(currentEditingTask && editTaskInput) {
      const newText = editTaskInput.value ? editTaskInput.value.trim() : "";
      console.log("New Text:", newText);
      if(newText !== ""){
        const spanElement = currentEditingTask.querySelector("span");
        if(spanElement){
          spanElement.textContent = newText;
          saveTasks();
          hideEditWindow();
        } else {
          console.error("Span Element not found in the current editing task");
        }
      }
    } else {
      console.error("currentEditingTask or editTaskInput is null or undefined2222222222")
    }
  });

  cancelEditButton.addEventListener("click", hideEditWindow);

  loadTasks();

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value;

    if (taskText !== "") {
      addTaskToDOM(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });
});

console.log("DOM Elements:");
console.log("taskForm:", document.getElementById("task-form"));
console.log("taskInput:", document.getElementById("task-input"));
console.log("taskList:", document.getElementById("task-list"));
console.log("floatingWindow:", document.getElementById("floating-window"));
console.log("editTaskInput:", document.getElementById("edit-task-input"));
console.log("saveEditButton:", document.getElementById("save-edit-button"));
console.log("cancelEditButton:", document.getElementById("cancel-edit-button"));