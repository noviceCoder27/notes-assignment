import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from './Tasks.module.css';
import { useState } from "react";
import { toastError } from "../../utils/toastMessage";
import { updateTaskCategory, updateTaskChecked } from "../../apis/task";
import { formatDate } from "../../utils/timestamp";

const Tasks = ({ details, buttons, tasks, setTasks }) => {
    const [showTasks, setShowTasks] = useState(false);

    const changeCategory = async (type) => {
        try {
            const res = await updateTaskCategory(details?._id, type);
            const updatedTasks = tasks.map(task => task._id === res.task._id ? res.task : task);
            setTasks(updatedTasks);
        } catch (err) {
            toastError("Error updating task");
        }
    }

    const displayButtons = buttons.map((buttonValue, index) =>
        <button key={index} onClick={() => changeCategory(buttonValue)}>{buttonValue}</button>
    )

    const updateCheck = async () => {
        const isChecked = !details.checked;
        try {
            const res = await updateTaskChecked(details._id, isChecked);
            const updatedTasks = tasks?.map(task => task._id === res.task._id ? res.task : task);
            setTasks(updatedTasks);
        } catch (err) {
            toastError("Error updating task");
        }
    }

    return (
        <>
            <div className={styles["card"]}>
                <div className={styles["heading"]}>
                    <h4 title={details?.title} className={styles["title"]}>
                        {details?.title.length > 40 ? `${details?.title.substring(0, 40)}...` : details?.title}
                    </h4>
                    <div className={styles["checklist-header"]}>
                        {showTasks ?
                            <button onClick={() => setShowTasks(false)}>
                                <FaChevronUp />
                            </button> :
                            <button onClick={() => setShowTasks(true)}>
                                <FaChevronDown />
                            </button>}
                    </div>
                </div>
                <div>
                    <div className={styles["tasks"]}>
                        {showTasks && <div className={styles["task"]} key={details._id}>
                            <input type="checkbox" className={styles["checkbox"]} checked={details.checked} onChange={() => updateCheck(details)} />
                            <div className={styles["task-content"]}>
                                <p>{details.description}</p>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className={styles["task-btns"]}>
                    {details?.category === "completed" && <div className={`${styles["date"]}`}>{formatDate(details?.completedAt)}</div>}
                    <div className={styles["btns"]}>
                        {displayButtons}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks;
