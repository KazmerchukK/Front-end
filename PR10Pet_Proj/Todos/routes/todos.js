const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const todosFilePath = path.join(__dirname, '../data/todos.json');

const readTodosFromFile = () => {
    try {
        const data = fs.readFileSync(todosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeTodosToFile = (todos) => {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
};

// Get all todos
router.get('/', (req, res) => {
    const todos = readTodosFromFile();
    res.json(todos);
});

// Add a new todo
router.post('/', (req, res) => {
    const newTodo = req.body;
    const todos = readTodosFromFile();
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;
    const todos = readTodosFromFile();
    const index = todos.findIndex(todo => todo.id == todoId);
    if (index !== -1) {
        todos[index] = updatedTodo;
        writeTodosToFile(todos);
        res.json(updatedTodo);
    } else {
        res.status(404).send('Todo not found');
    }
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const todoId = req.params.id;
    let todos = readTodosFromFile();
    todos = todos.filter(todo => todo.id != todoId);
    writeTodosToFile(todos);
    res.status(204).send();
});

module.exports = router;
