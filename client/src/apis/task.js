import axios from 'axios'
const task_url = import.meta.env.VITE_TASKS_BACKEND_URL || 'http://localhost:3000/tasks';


export const getAllTasks = async () => {
    try {
        const res = await axios.get(`${task_url}`);
        return res.data;
    } catch(err) {
        throw err;
    }
}

export const createTask = async (data) => {
    try {
        const res = await axios.post(`${task_url}/create`,data);
        return res.data;
    } catch(err) {
        throw err;
    }
}


export const updateTaskCategory = async (id,category) => {
    let typeValue = category.toLowerCase();
    if(typeValue === "start") typeValue = "in-progress"
    try {
        const res = await axios.patch(`${task_url}/category/${id}`,{category: typeValue});
        return res.data;
    } catch(err) {
        throw err;
    }
}

export const updateTaskChecked = async (id,checked) => {
    try {
        const res = await axios.patch(`${task_url}/checked/${id}`,{checked});
        return res.data;
    } catch(err) {
        throw err;
    }
}


