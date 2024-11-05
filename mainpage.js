const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

       
        let checkIcon = document.createElement("span");
        checkIcon.textContent = "✔"; 
        checkIcon.className = "check-icon";
        li.insertBefore(checkIcon, li.firstChild);

       
        let span = document.createElement("span");
        span.textContent = "x";
        span.className = "delete";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    SaveData();
}


listContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("check-icon")) {
        e.target.parentElement.classList.toggle("checked");
        SaveData();
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        SaveData();
    } else if (e.target.tagName === "LI" && !e.target.classList.contains("editing")) {
        editTask(e.target);
    }
}, false);


listContainer.addEventListener("dblclick", function(e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("editing")) {
        e.target.classList.toggle("checked");
        SaveData();
    }
}, false);

function editTask(taskElement) {
    const originalText = taskElement.childNodes[1].textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText.trim(); 
    input.className = "edit-input";
    
    taskElement.textContent = ''; 
    taskElement.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => saveEdit(taskElement, input)); 
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(taskElement, input); 
    });

    taskElement.classList.add("editing");
}

function saveEdit(taskElement, input) {
    taskElement.textContent = ''; 

    let checkIcon = document.createElement("span");
    checkIcon.textContent = "✔";
    checkIcon.className = "check-icon";
    taskElement.appendChild(checkIcon);

    
    let textNode = document.createTextNode(" " + input.value); 
    taskElement.appendChild(textNode);

    const span = document.createElement("span");
    span.textContent = "x";
    span.className = "delete";
    taskElement.appendChild(span);

    taskElement.classList.remove("editing");
    SaveData();
}

function SaveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();