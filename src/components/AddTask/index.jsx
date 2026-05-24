import {useEffect, useState} from 'react'
import { v4 as uuidv4 } from "uuid";
import './index.css'

const AddTask = ({ tasksList, setTasksList, setActivePage }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [time, setTime] = useState('');
    const [tags, setTags] = useState('');
    
    const getTaskListForm = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            title,
            description,
            category,
            priority,
            status,
            dueDate,
            time,
            tags
        };
        setActivePage("dashboard");
        setTasksList((prevTasks) => [...prevTasks, newTask]);
        setTitle('');
        setDescription('');
        setCategory('');
        setPriority('');
        setStatus('');
        setDueDate('');
        setTime('');
        setTags('');
    };

    useEffect(() => {
        console.log('Tasks List:', tasksList);
    }, [tasksList]);

    return(
        <div className="add-task-container">
            <div className="add-task-content">
                <div className="add-task-header">
                    <h2>Add New Task</h2>
                    <p>Fill in the details to create a new task</p>
                </div>
                <div className="add-task-form">
                    <form onSubmit={getTaskListForm}>
                        <div className="form-group">
                            <label htmlFor="task-title">Task Title</label>
                            <input 
                                type="text" 
                                id="task-title" 
                                placeholder="Enter task title" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-content-details">
                            <div className="form-group">
                                <label htmlFor="task-desc">Task Description</label>
                                <textarea 
                                    id="task-desc" 
                                    placeholder="Enter task description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="task-category">Category</label>
                                <select 
                                    id="task-category" 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-content-details">
                            <div className="form-group">
                                <label htmlFor="task-priority">Priority</label>
                                <select 
                                    id="task-priority" 
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Priority
                                    </option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="task-status">Status</label>
                                <select 
                                    id="task-status" 
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-content-details">
                            <div className="form-group">
                                <label htmlFor="task-due-date">Due Date</label>
                                <input 
                                    type="date" 
                                    id="task-due-date" 
                                    placeholder="Select Due Date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="task-time">Time</label>
                                <input 
                                    type="time" 
                                    id="task-time" 
                                    placeholder="Select Time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                id="task-tags" 
                                placeholder="Enter task tags (e.g. work, personal)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                        <div className="form-btn-card">
                            <button type="submit" className="add-task-button">Create Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTask;