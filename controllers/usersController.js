const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

async function createUser(req, res){
    const { username, email, password } = req.body
    try{
        const encryptPassword = await bcrypt.hash(password, 13);
        const user = await User.create({
            username: username,
            email: email,
            password: encryptPassword
        })

        const result = {
            message: 'User created successfully',
            data: {
                userId: user.userId
            }
        }
        
        res.status(201).json(result);
    }catch (err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function signIn(req, res){
    const { email, password } = req.body
    try{
        const user = await User.findOne({ where: { email: email } })
        if (!user){
            return res.status(400).json({ error: 'Email is invalid.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return res.status(400).json({ error: 'Password is invalid.' });
        }

        const token = jwt.sign({ userId: user.userId, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const result = {
            message: 'Sign in successfully',
            data: {
                token: token
            }
        }
        res.status(200).json(result);
    }catch (err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function updateUser(req,res){
    const userId = req.params.userId
    const username = req.body.username
    try{
        const updatedUser = await User.update({ username }, {
            where: { userId }
        });

        if(!updatedUser){
            return res.status(404).json({ error: 'User is not found.' });
        }

        const user = await User.findOne({ where: { userId } })

        const result = {
            message: 'Updated successfully',
            data: {
                userId: user.userId,
                username: user.username
            }
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function deleteUser(req,res){
    const userId = req.params.userId
    try{
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.destroy({ where: { userId } });

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

async function getUserById(req,res){
    const userId = req.params.userId
    try{
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = {
            message: 'success',
            data: user
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function getMyProfile(req,res){
    const userId = req.userData.userId
    try{
        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = {
            message: 'success',
            data: user
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function updateMyProfile(req,res){
    const userId = req.userData.userId
    const username = req.body.username
    try{
        const updatedUser = await User.update({ username }, {
            where: { userId }
        });

        if(!updatedUser){
            return res.status(404).json({ error: 'User is not found.' });
        }

        const user = await User.findOne({ where: { userId } })

        const result = {
            message: 'Updated successfully',
            data: {
                userId: user.userId,
                username: user.username
            }
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

async function getAllUsers(req,res){
    try{
        const users = await User.findAll();
        const result = {
            message: 'success',
            data: users
        }
        
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({ 
            error: err.message 
        });
    }
}

module.exports = {
    createUser,
    signIn,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getMyProfile,
    updateMyProfile
}