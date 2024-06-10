document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const addTodoButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');

    addTodoButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const description = descriptionInput.value.trim();

        if (name && description) {
            const newTodo = {
                id: Date.now().toString(),
                name,
                description,
                completed: false
            };
            fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            })
            .then(response => response.json())
            .then(todo => {
                addTodoToDOM(todo);
                nameInput.value = '';
                descriptionInput.value = '';
            });
        }
    });

    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.setAttribute('data-id', todo.id);
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span><strong>${todo.name}</strong>: ${todo.description}</span>
            <div>
                <button class="complete">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const completeButton = li.querySelector('.complete');
        const deleteButton = li.querySelector('.delete');

        completeButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            fetch(`/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo)
            })
            .then(response => response.json())
            .then(updatedTodo => {
                li.className = updatedTodo.completed ? 'completed' : '';
                completeButton.textContent = updatedTodo.completed ? 'Undo' : 'Complete';
            });
        });

        deleteButton.addEventListener('click', () => {
            fetch(`/api/todos/${todo.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                todoList.removeChild(li);
            });
        });

        todoList.appendChild(li);
    }

    fetch('/api/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => addTodoToDOM(todo));
        });
});
