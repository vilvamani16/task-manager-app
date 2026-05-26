import {useState, useEffect} from "react"

import { isAfter, format } from "date-fns"

import axios from "axios"

import { IoMdArrowDropdown } from "react-icons/io";
import {FaPlus, FaBars, FaTimes, FaTasks, FaRegClock,FaRegCheckCircle, FaRegCircle, FaRegEdit, FaRegTrashAlt, FaClock} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


import "./index.css"
import { set } from "date-fns/fp";

const Dashboard = ({tasksList , setActivePage, handleDeleteTask, showMenu, toggleMenu, viewAll, toggleViewAll}) => {
    const [username, setUsername] = useState("")
    const NotaskView = () => (
        <div className="no-task-card">
            <img src="/no-task-image.png" alt="no task" className="no-task-image"/>
        </div>
    )


    const today = new Date()

    const upcomingTasks = tasksList
    .filter(task => new Date(task.dueDate).getTime() >= today)
    .sort((a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )

    useEffect(() => {
       const url = "https://task-manager-app-2-n4qf.onrender.com/api/me"
        axios.get(url, {withCredentials : true}).then((response) => {
            setUsername(response.data.username)
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    return(  
        <>
        <div className="header-card">
            <div className="greeting-card">
                <div className="hamburger-btn">
                    <button type="button" className="navbar-btn" onClick={toggleMenu}>
                    {showMenu ? <FaTimes size={16} /> : <FaBars size={16} />}
                    </button>
                </div>
            <div>
                <h2>Welcome back, {username}</h2>
                <p>Here's what's happening with your tasks today.</p>
            </div>
            </div>
            <div className="header-btns-card">
                <div className="add-task-card">
                <button type="button" className="add-task-btn" onClick={() => setActivePage("add-task")}>
                    <FaPlus size={12} color="#000000" /> Add Task
                </button>
                </div>
            </div>
        </div>
        <div className="dashboard-container">
            <div className="dashboard-content-card">
                <div className="dashboard-content-details">
                    <FaTasks size={40} color="#ffae00" />
                <div className="info-card">
                    <h2>Total Tasks</h2>
                    <p className="info-value">{tasksList.length}</p>
                    <p className="info-text">All tasks in total</p>
                </div>
                </div>
                <div className="dashboard-content-details">
                    <FaRegCheckCircle size={40} color="#4CAF50" />
                <div className="info-card">
                    <h2>Completed</h2>
                    <p className="info-value">{tasksList.filter(task => task.status === "completed").length}</p>
                    <p className="info-text">Tasks completed</p>
                </div>
                </div>
                <div className="dashboard-content-details">
                    <FaRegClock size={40} color="#ff9100" />
                <div className="info-card">
                    <h2>In Progress</h2>
                    <p className="info-value">{tasksList.filter(task => task.status === "in-progress").length}</p>
                    <p className="info-text">Tasks in progress</p>
                </div>
                </div>
                <div className="dashboard-content-details">
                    <FaRegCircle size={40} color="#f44336" />
                <div className="info-card">
                    <h2>Pending</h2>
                    <p className="info-value">{tasksList.filter(task => task.status === "pending").length}</p>
                    <p className="info-text">Tasks pending</p>
                </div>
                </div>
            </div>
            <div className="my-task-container">
            <div className={viewAll ? "my-task-card expanded" : "my-task-card"}>
                <div className="my-task-header">
                    <h2>My Tasks</h2>
                    <button className="view-all-btn" onClick={toggleViewAll}>{viewAll ? "View Less" : "View All"}</button>
                </div>
                <div className="list-content">
                    <div className="list-item">
                        <button className="status-btn">All</button>
                        <button className="status-btn">Completed</button>
                        <button className="status-btn">In Progress</button>
                        <button className="status-btn">Pending</button> 
                    </div>
                </div>
                {tasksList.length === 0 ? <NotaskView /> : (<ul className="task-list-container">
                    {tasksList?.map((task)=>(
                         <li className="task-item" key={task.id}>
                        <div className="task-item-details">
                            <input type="checkbox"/>
                        <div className="task-details">
                            <div className="task-title">
                                <h2>{task.title}</h2>
                                <div className="tag">
                                    <p>{task.tags}</p>
                                </div>
                            </div>
                            <p className="task-description">{task.description}</p>
                        </div>
                        </div>
                        <div>
                            <div className="pending-card">
                                <div className="status-card">
                                    <div className="status-tag">
                                        <p className="status">{task.status}</p>
                                    </div>
                                    <p className="task-date">{task.dueDate}</p>
                                </div>
                        <div className="delete-edit-btns">
                            <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}><FaRegTrashAlt size={20} /></button>
                        </div>
                            </div>
                        </div>
                    </li>
                    ))}
                </ul>)}
            </div>
            <div className="my-task-graph-card">
                <div className={viewAll ? "upcoming-task-card expanded" : "upcoming-task-card"}>
                    <div className="upcoming-task-header">
                        <h2>Upcoming Tasks</h2>
                        <button className="view-all-btn" onClick={() => setActivePage("calender")}>viewCalender</button>
                    </div>
                    <ul className="upcoming-task-list">
                        {upcomingTasks.map((task) => (
                            <li className="upcoming-task-item" key={task.id}>
                            <div className="upcoming-tasks-text">
                                <div className="date-card">
                                    <p>{format(new Date(task.dueDate), "MMM")}</p>
                                    <h2>{format(new Date(task.dueDate), "dd")}</h2>
                                </div>
                                <div className="tasks-title-card">
                                    <h2>{task.title}</h2>
                                    <div>
                                        <p className="upcoming-status">{task.status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="time-card">
                                <FaClock size={12}/>
                                <p>{task.time}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;