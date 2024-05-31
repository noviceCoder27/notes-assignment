import {  useState } from 'react';
import styles from './Modal.module.css'
import { toastError, toastSuccess } from '../../utils/toastMessage';
import { createTask } from '../../apis/task';
import { checkDescription, checkTitle} from '../../utils/validation/taskValidation';

const Modal = ({setOpenModal,setTasks}) => {
  const [task,setTask] = useState({title: "",description: ""});
  const create = async() => {
    if(checkTitle(task.title) && checkDescription(task.description)) {
      try {
        const taskDetails = await createTask(task);
        setTasks(prev => prev ? [...prev,taskDetails.task]:[taskDetails.task]);
        setOpenModal(false);
        toastSuccess("Task created succesfully")
      } catch(err) {
        console.log(err)
        toastError("Error creating task");
      }
    }
  }
  
  return (
    <div className= {styles["modal"]}>
      <div className= {styles["overlay"]}></div>
      <div className = {styles["task-content"]}>
        <div className = {styles["title"]}>
            <label htmlFor = "title">Title <span className = {styles["asterisk"]}>*</span></label>
            <input type="text" name="title" id="title" placeholder = "Enter Task Title" value = {task.title} onChange={(e) => setTask(prev => ({...prev,title: e.target.value}))}/>
        </div>
        <div>
          <label className = {styles["description-label"]}>Description <span className = {styles["asterisk"]}>*</span></label>
          <textarea placeholder = "Enter description" className = {styles["description"]} value = {task.description} onChange = {(e) => setTask(prev => ({...prev,description: e.target.value}))}></textarea>
        </div>
       
        <div className = {styles["btns"]}>
            <div>
                <button 
                className = {styles["cancel"]} 
                onClick={() => {setOpenModal(false)}}>
                    Cancel
                </button>
                <button className = {styles["save"]} onClick = {create}>Save</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
