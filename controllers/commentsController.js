const { Comment, Task } = require('../models');

async function getAllComments(req,res){  
    try{
        const comments = await Comment.findAll({ include: { model: Task } });
        const result = {
            message: 'success',
            data: comments
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function getCommentById(req,res){
    const commentId = req.params.commentId
    try{
        const comment = await Comment.findOne({ 
            where: { commentId },
            include: { 
                model: Task
            }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const result = {
            message: 'success',
            data: comment
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function createComment(req,res){
    const { taskId, comment } = req.body
    try{
        const task = await Task.findOne({ where: { taskId } })

        if(!task){
            return res.status(404).json({ error: 'Task not found' });
        }

        const createdComment = await Comment.create({
            taskId: taskId,
            userId: task.userId,
            comment: comment
        })

        const result = {
            message: 'Comment created successfully',
            data: createdComment
        }
        
        res.status(201).json(result);
    }catch (err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function updateComment(req,res){
    const commentId = req.params.commentId
    const comment = req.body.comment
    try{
        const updatedComment = await Comment.update({ comment }, {
            where: { commentId }
        });

        if(!updatedComment){
            return res.status(404).json({ error: 'Comment is not found.' });
        }

        const foundComment = await Comment.findOne({ where: { commentId } })

        const result = {
            message: 'Updated successfully',
            data: foundComment
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }    
}

async function deleteComment(req,res){
    const commentId = req.params.commentId
    try{
        const deletedComment = await Comment.destroy({ where: { commentId } });

        if (!deletedComment){
            return res.status(404).json({ error: 'Comment not found' });
        }

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

async function deleteCommentByTaskId(req,res){
    const taskId = req.body.taskId
    try{
        const deletedComment = await Comment.destroy({
            where: {
              taskId: taskId
            }
        });

        if (!deletedComment) {
            return res.status(404).json({ error: 'No Comments found for this task.' });
        }

        const result = {
            message: 'Deleted comments for this task successfully'
        }

        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    deleteCommentByTaskId
}