const express = require('express');
const usersRoutes = require('./routes/users')
const tasksRoutes = require('./routes/tasks')
const commentsRoutes = require('./routes/comments')
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

require('dotenv').config();

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send("Lenextix interview project")
});

app.use('/users', usersRoutes)
app.use('/tasks', tasksRoutes)
app.use('/comments', commentsRoutes)

app.listen(port, () => {
    console.log(`This server is running at http://localhost:${port}`);
});