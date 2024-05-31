const Task = require('../models/task');
const moment = require('moment-timezone');

const getAllTasks = async(req,res,next) => {
    try{
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch(err) {
        next(err);
    }
}


const createTask = async (req,res,next) => {
    const {title,description} = req.body;
    try {
        const task = await Task.create({title,description});
        res.status(201).json({msg: "Task created successfully",task});
    } catch(err) {
        console.log(err)
        next(err);
    }
}

const updateChecked = async (req,res,next) => {
    const {checked} = req.body;
    const {id: _id} = req.params;
    try {
        const task = await Task.findByIdAndUpdate(_id,{checked},{new: true})
        res.status(201).json({msg: "Task updated successfully",task});
    } catch(err) {
        next(err);
    }
}


const changeCategory = async(req,res,next) => {
    const {id: _id} = req.params;
    const {category} = req.body;
    let flag = false;
    if(category === "completed") flag = true;
    try{
        const task = flag ? await Task.findByIdAndUpdate(_id,{category,completedAt: moment().tz('Asia/Kolkata').format()},{new: true}) : await Task.findByIdAndUpdate(_id,{category},{new: true});
        if(task) {
            res.status(200).json({msg: "Updated succesfully",task});
        } else {
            res.status(404).json({msg: "Task not found"});
        }
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getAllTasks,
    createTask,
    changeCategory,
    updateChecked
}   