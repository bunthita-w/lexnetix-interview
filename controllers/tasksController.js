const { Task, Comment } = require('../models');

async function getAllTasks(req,res){  
    try{
        const tasks = await Task.findAll({ include: { model: Comment } });
        const result = {
            message: 'success',
            data: tasks
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function getTaskById(req,res){
    const taskId = req.params.taskId
    try{
        const task = await Task.findOne({ 
            where: { taskId },
            include: { 
                model: Comment
            }
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const result = {
            message: 'success',
            data: task
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function createTask(req,res){
    const { userId, title, description, status, priority, dueDate } = req.body
    try{
        const task = await Task.create({
            userId: userId,
            title: title,
            description: description,
            status: status,
            priority: priority,
            dueDate: dueDate
        })

        const result = {
            message: 'Task created successfully',
            data: task
        }
        
        res.status(201).json(result);
    }catch (err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function updateTask(req,res){
    const taskId = req.params.taskId
    const { title, description, status, priority, dueDate } = req.body
    try{
        const updatedTask = await Task.update({ title, description, status, priority, dueDate }, {
            where: { taskId }
        });

        if(!updatedTask){
            return res.status(404).json({ error: 'Task is not found.' });
        }

        const task = await Task.findOne({ where: { taskId } })

        const result = {
            message: 'Updated successfully',
            data: task
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }    
}

async function deleteTask(req,res){
    const taskId = req.params.taskId
    try{
        const task = await Task.findOne({ where: { taskId } });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await Task.destroy({ where: { taskId } });

        const result = {
            message: 'Deleted successfully'
        }

        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}