document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span><strong>${task.name}</strong>: ${task.description}</span>
        `;
        taskList.appendChild(li);
    }

    fetch('/api/todos')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTaskToDOM(task));
        });
});
