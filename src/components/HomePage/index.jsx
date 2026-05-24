import { useState } from "react";

import { MdDashboardCustomize } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiSettings } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuNotepadText } from "react-icons/lu";
import { FaRegFolder } from "react-icons/fa";

import Dashboard from "../Dashboard";
import AddTask from "../AddTask";
import Calender from '../Calender'
import MyTask from '../MyTask'
import Settings from '../Settings'
import './index.css'

const HomePage = () => {
    const [tasksList, setTasksList] = useState([]);
    const [activePage, setActivePage] = useState("dashboard");
    const [showMenu, setShowMenu] = useState(false)
    const [viewAll, setViewAll] = useState(false)
    const toggleMenu = () => {
        setShowMenu((prev) => !prev)
    }
    const toggleViewAll = () => {
        setViewAll((prev) => !prev)
    }
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasksList.filter(task => task.id !== taskId);
        setTasksList(updatedTasks);
    }
    return(
        <div className='home-container'>
            <div className='home-card'>
                <div className={showMenu ? "slidebar-container active" : "slidebar-container"}>
                    <div className='slidebar-card'>
                        <div className='website-logo-card'>
                            <img src="/website-logo.png" alt="website logo" className='home-logo'/>
                            <p>Stay organized, get things done.</p>
                        </div>
                        <div className="slidebar-content-card">
                            <div to="/" className='slidebar-links' onClick={() => setActivePage("dashboard")}>
                                <MdDashboardCustomize size={20} color="#8d8d7d"/>
                                <p>Dashboard</p>
                            </div>
                            <div to="/my-tasks" className='slidebar-links' onClick={() => setActivePage("my-tasks")}>
                                <LuNotepadText size={20} color="#8d8d7d"/>
                                <p>My Tasks</p>
                            </div>
                            <div to="/add-task" className='slidebar-links' onClick={() => setActivePage("add-task")}>
                                <IoAddCircleOutline size={20} color="#8d8d7d"/>
                                <p>Add Task</p>
                            </div>
                            <div to="/calender" className='slidebar-links' onClick={() => setActivePage("calender")}>
                                <SlCalender size={20} color="#8d8d7d"/>
                                <p>Calender</p>
                            </div>
                            <div to="/settings" className='slidebar-links' onClick={() => setActivePage("settings")}>
                                <CiSettings size={20} color="#8d8d7d"/>
                                <p>Settings</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-container">
                    {activePage === "dashboard" && <Dashboard  tasksList={tasksList} setTasksList={setTasksList} setActivePage={setActivePage} handleDeleteTask={handleDeleteTask} showMenu={showMenu} toggleMenu={toggleMenu} viewAll={viewAll} toggleViewAll={toggleViewAll}/>}
                    {activePage === "add-task" && <AddTask  tasksList={tasksList} setTasksList={setTasksList} setActivePage={setActivePage}/>}
                    {activePage === "calender" && <Calender setActivePage={setActivePage} setTasksList={setTasksList} tasksList={tasksList}/>}
                    {activePage === "my-tasks" && <MyTask tasksList={tasksList} setActivePage={setActivePage}/>}
                    {activePage === "settings" && <Settings/>}
                </div>
            </div>
        </div>
    )
}

export default HomePage;