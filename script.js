document.addEventListener(`DOMContentLoaded`, () => {
  const addButton = document.getElementById(`add-task-btn`);
  const taskInput = document.getElementById(`task-input`);
  const taskList = document.getElementById(`task-list`);

  let tasks = JSON.parse(localStorage.getItem(`tasks`)) || [];

  function loadTasks() {
    taskList.innerHTML = ``;
    tasks.forEach((taskText) => {
      let li = document.createElement(`li`);
      li.textContent = taskText;

      let btnRemove = document.createElement(`button`);
      btnRemove.textContent = `Remove`;
      btnRemove.classList.add(`remove-btn`);

      btnRemove.addEventListener(`click`, () => {
        li.remove();
        tasks = tasks.filter((t) => t !== taskText);
        localStorage.setItem(`tasks`, JSON.stringify(tasks));
      });

      li.appendChild(btnRemove);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === ``) {
      alert(`Please enter a task`);
      return;
    }

    tasks.push(taskText);
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
    loadTasks();

    taskInput.value = ``;
  }

  addButton.addEventListener(`click`, addTask);

  taskInput.addEventListener(`keypress`, (event) => {
    if (event.key === `Enter`) {
      addTask();
    }
  });

  loadTasks();
});