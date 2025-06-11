let inputBox = document.querySelector("#input-box");
let listBox = document.querySelector("#list-container");
let completedCounter = document.getElementById("completed-counter");
let uncompletedCounter = document.getElementById("uncompleted-counter");

let tasks = [];

function addTask() {
  const text = inputBox.value.trim();
  if (!text) {
    alert("You must write something.");
    return;
  }
  tasks.push({ text: text, completed: false });
  inputBox.value = "";
  saveData();
  renderTask();
}
function renderTask() {
  listBox.innerHTML = ""; // clear existing list

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    // checkbox listener
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      saveData();
      renderTask(); // re-render after change
    });

    //  Task text
    let taskText = document.createTextNode(task.text);
    if (task.completed) {
      li.classList.add("completed");
    }

    // Edit button
    let editSpan = document.createElement("span");
    editSpan.innerHTML = "Edit";
    editSpan.className = "edit-btn";
    editSpan.onclick = () => {
      let newText = prompt("Edit your task:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        saveData();
        renderTask();
      }
    };

    // Delete button
    let deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "Delete";
    deleteSpan.className = "delete-btn";
    deleteSpan.onclick = () => {
      tasks.splice(index, 1);
      saveData();
      renderTask();
    };
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(editSpan);
    li.appendChild(deleteSpan);
    listBox.appendChild(li);
  });
  updateCounters();
}

function updateCounters() {
  const completed = tasks.filter((task) => task.completed).length;
  const uncompleted = tasks.length - completed;
  completedCounter.textContent = completed;
  uncompletedCounter.textContent = uncompleted;
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadData() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderTask();
  }
}

loadData();

function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = []; // Clear the in-memory task list
    saveData(); // Update localStorage
    renderTask(); // Re-render UI and update counters
  }
}
