const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    completedAt: {type: Date},
    checked: {type: Boolean,required: true, default: false},
    category: {type: String, enum: ["completed","pending","in-progress"], required: true,default: "pending"}
},{timestamps: true});

module.exports = mongoose.model('Task',TaskSchema);