import styles from './CardSections.module.css';
import { GoPlus } from "react-icons/go";
import Tasks from '../tasks/Tasks';
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import { getAllTasks, updateTaskCategory } from '../../apis/task';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toastError } from '../../utils/toastMessage';

const CardSections = () => {
    const [tasks, setTasks] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getAllTasks();
                setTasks(res);
            } catch (err) {
                toastError("Error fetching tasks");
            }
        }
        getData();
    }, []);

    const changeCategory = async (sourceId,type) => {
        try {
            const res = await updateTaskCategory(sourceId, type);
            return res.task
        } catch (err) {
            toastError("Error updating task");
        }
    }

    const onDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        if (source.droppableId !== destination.droppableId) {
            const updatedTasks = tasks.map(task => {
                if (task._id === draggableId) {
                    task.category = destination.droppableId;
                }
                return task;
            });
            setTasks(updatedTasks);
            const updatedTask = await changeCategory(draggableId, destination.droppableId);
            if (!updatedTask) {
                const revertedTasks = tasks.map(task => {
                    if (task._id === draggableId) {
                        task.category = source.droppableId;
                    }
                    return task;
                });
                setTasks(revertedTasks);
            } else {
                const finalUpdatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
                setTasks(finalUpdatedTasks);
            }
        }
    }


    const renderTaskList = (taskList) => taskList?.map((obj, index) => (
        <Draggable key={obj._id} draggableId={obj._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.draggableTask}
                >
                    <Tasks
                        key={obj._id}
                        details={obj}
                        tasks={tasks}
                        setTasks={setTasks}
                        buttons={["PENDING", "START", "COMPLETED"]}
                    />
                </div>
            )}
        </Draggable>
    ));

    const pendingLists = tasks?.filter(task => task.category === "pending");
    const completedLists = tasks?.filter(task => task.category === "completed");
    const inProgressLists = tasks?.filter(task => task.category === "in-progress");

    return (
        <>
            {openModal && <Modal setOpenModal={setOpenModal} setTasks={setTasks} />}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles["sections"]}>
                    <div className={styles["taskSection"]}>
                        <div className={styles['header']}>
                            <h4>Pending</h4>
                            <div>
                                <GoPlus className={styles['add']} onClick={() => setOpenModal(true)} />
                            </div>
                        </div>
                        <Droppable droppableId="pending">
                            {(provided) => (
                                <div className={styles["card-section"]} {...provided.droppableProps} ref={provided.innerRef}>
                                    {renderTaskList(pendingLists)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className={styles["taskSection"]}>
                        <div className={styles['header']}>
                            <h4>In progress</h4>
                        </div>
                        <Droppable droppableId="in-progress">
                            {(provided) => (
                                <div className={styles["card-section"]} {...provided.droppableProps} ref={provided.innerRef}>
                                    {renderTaskList(inProgressLists)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className={styles["taskSection"]}>
                        <div className={styles['header']}>
                            <h4>Completed</h4>
                        </div>
                        <Droppable droppableId="completed">
                            {(provided) => (
                                <div className={styles["card-section"]} {...provided.droppableProps} ref={provided.innerRef}>
                                    {renderTaskList(completedLists)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </>
    );
}

export default CardSections;
