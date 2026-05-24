import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'

import { GoPerson } from "react-icons/go";
import { MdVpnKey } from "react-icons/md";
import "./index.css";
const LoginPage = () => {
    const [showpassword, setShowpassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const toShowpassword = () => {
        setShowpassword((prev) => ! prev)
    }

    const [form, setForm] = useState({
        username: "", password: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async(e)=> {
        e.preventDefault()

        setError("");
        setSuccess("");

        const url = "http://localhost:5000/api/login"

        const userDetails = {
            name:  form.username,
            password: form.password,
        }

        try{
            const response = await axios.post(url, userDetails, {
            withCredentials: true
        })
            setSuccess(response.data.message)
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }catch(e){
            setError(e.response?.data?.message || "Something went wrong");
        }
    }

    return(
        <div className="login-container">
            <div className="login-card">
                <form onSubmit={handlesubmit}>
                    <div className="form-card">
                        <h1>Sign in</h1>
                        <div className="register-link-card">
                            <p>Not registered?</p>
                                <Link to="/register" className="register-link">Click here to register</Link>
                        </div>
                        <div className="input-card">
                            <div className="input-box">
                                <GoPerson size={20} className="icon"/>
                                <input type="text" placeholder="Username" name="username" value={form.username} onChange={handleChange}/>
                            </div>
                            <div className="input-box">
                                <MdVpnKey size={20} className="icon"/>
                                <input type={showpassword ? "text" : "password"} placeholder="Password" name="password" value={form.password} onChange={handleChange}/>    
                            </div>
                        </div>
                        <div className="options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" className="check-box" onChange={toShowpassword}/>
                                <label htmlFor="remember-me">Show Password</label>
                            </div>
                            <div className="forgot-password">
                                <button type="button" className="forgot-btn">Forgot password?</button>
                            </div>
                        </div>
                        <button type="submit" className="sign-in-btn">Sign in</button>
                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="success-message">
                                {success}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage