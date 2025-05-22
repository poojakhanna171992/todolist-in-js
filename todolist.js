let inputbox = document.querySelector("#input-box");
let listbox = document.querySelector("#list-container");

function addtask() {
  if (inputbox.value === "") {
    alert("You must write something.");
  } else {
    let li = document.createElement("li");
    // Create text node instead of using innerHTML
    let taskText = document.createTextNode(inputbox.value);
    li.appendChild(taskText);

    //create span for delete
    let deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "\u00d7";
    deleteSpan.className = "delete";

    //create span for edit
    let editSpan = document.createElement("span");
    editSpan.innerHTML = "\u270E"; //edit symbol
    editSpan.className = "edit";

    //append both to the li
    li.appendChild(editSpan);
    li.appendChild(deleteSpan);

    listbox.appendChild(li);
  }
  inputbox.value = "";
  savedata();
}

listbox.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      savedata();
    } else if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
      savedata();
    } else if (e.target.classList.contains("edit")) {
      let li = e.target.parentElement;
      let currentText = li.firstChild.textContent;
      let newText = prompt("Edit your task:", currentText);
      if (newText !== null && newText.trim() !== "") {
        li.childNodes[0].textContent = newText;
        savedata();
      }
    }
  },
  false
);

function savedata() {
  localStorage.setItem("data", listbox.innerHTML);
}
function showdata() {
  listbox.innerHTML = localStorage.getItem("data");
}
showdata();

function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    listbox.innerHTML = "";
    localStorage.removeItem("data");
  }
}
