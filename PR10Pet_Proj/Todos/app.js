const express = require('express');
const path = require('path');
const app = express();
const PORT = 3030;
const { eventLogs } = require('./middleware/eventLogs');
const errorHandler = require('./middleware/errorHandler');
const todosRouter = require('./routes/todos');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(eventLogs);

app.use('/api/todos', todosRouter);

app.get('/tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'task.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
