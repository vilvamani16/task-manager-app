import {useState} from 'react'
import {FaSearch, FaClock} from "react-icons/fa";
import './index.css'
const MyTask = ({tasksList, setActivePage}) => {
    const [searchInput, setSearchInput] = useState("")
    const filteredTask = tasksList.filter((task) => (
        task.title.toLowerCase().includes(searchInput.toLowerCase())
    ))
    return(
        <div className="mytask-container">
            <div className="mytask-card">
                <div className="mytask-header-card">
                    <div className="mytask-header-text">
                        <h2>My Task</h2>
                        <p>Manage and Organized your task</p>
                    </div>
                    <div className="search-card">
                        <input type="search" placeholder="Search your tasks" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                        <FaSearch size={20}/>
                    </div>
                </div>
                <div className='mytask-view-container'>
                    <div className='mytask-top-header'>
                        <p>Task</p>
                        <p>Priority</p>
                        <p>Date</p>
                        <p>Status</p>
                    </div>
                    <ul className='mytask-view-card'>
                        {filteredTask.map((task) => (
                            <li className='mytask-view-list' key={task.id}>
                                <div className='list-text-card'>
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                </div>
                                <div className='priority-card'>
                                    <p>{task.priority}</p>
                                </div>
                                <div className='list-date-card'>
                                    <FaClock/>
                                    <p>{task.dueDate}</p>
                                </div>
                                <p>{task.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyTask