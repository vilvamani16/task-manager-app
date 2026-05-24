import { useState, useEffect } from "react";

import {useNavigate} from "react-router-dom";

import axios from 'axios'

import {
    FaMoon,
    FaBell,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

import "./index.css";

const Settings = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const [darkMode, setDarkMode] = useState(false);

    const [notifications, setNotifications] = useState(true);

    const navigate = useNavigate()

    const handleLogout = async() => {
        try{
            const url = `${import.meta.env.VITE_API_URL}/api/logout`
            await axios.post(
            url, {}, {
                withCredentials: true
            }
        )
        navigate("/login")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
            const url = "http://localhost:5000/api/me"
            axios.get(url, {withCredentials : true}).then((response) => {
                setUsername(response.data.username),
                setEmail(response.data.email)
            }).catch((e) => {
                console.log(e)
            })
        }, [])

    return(
        <div className="settings-container">
            <div className="settings-card">
                <div className="settings-header">
                    <h1>Settings</h1>
                    <p>Manage your application preferences</p>
                </div>
                <div className="settings-section">
                    <div className="settings-title">
                        <FaUserCircle size={24}/>
                        <h2>Profile</h2>
                    </div>
                    <div className="profile-card">
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="profile"
                        />
                        <div>
                            <h3>{username}</h3>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className="settings-section">
                    <div className="settings-title">
                        <FaMoon size={22}/>
                        <h2>Dark Mode</h2>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() =>
                                setDarkMode(!darkMode)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="settings-section">
                    <div className="settings-title">
                        <FaBell size={22}/>
                        <h2>Notifications</h2>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() =>
                                setNotifications(!notifications)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <button type="button" className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt/>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Settings;