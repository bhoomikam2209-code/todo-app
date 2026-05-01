let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks when page opens
window.onload = function () {
    displayTasks();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({ text: task, completed: false });

    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        // Apply completed style
        if (task.completed) {
            li.classList.add("completed");
        }

        // Toggle complete
        li.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        // Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = function (e) {
            e.stopPropagation();
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}