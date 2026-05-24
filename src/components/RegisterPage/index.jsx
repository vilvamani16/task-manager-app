import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

import { GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaEye } from "react-icons/fa";

import './index.css'

const RegisterPage = () => {
    const [showpassword, setShowpassword] = useState(false)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({username: "", email: "", password: "", confirmPassword: ""})
    const navigate = useNavigate();
    
    const toShowpassword = () => {
        setShowpassword((prev) => !prev)
    }
    const handleChange = (e) =>  {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = async(e)=> {
        e.preventDefault()

        setError("");
        setSuccess("");

        const url = `${import.meta.env.VITE_API_URL}/api/register`

        const userDetails = {
            name:  form.username,
            email: form.email,
            password: form.password,
        }

        if(form.password !== form.confirmPassword){
            setError("Password do not match")
            return
        }

        try{
            const response = await axios.post(url, userDetails)
            setSuccess(response.data.message)
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }catch(e){
            setError(e.response?.data?.message || "Something went wrong");
        }
    }
    return(
        <div className="register-container">
            <div className="register-card">
                <form onSubmit={handlesubmit}>
                    <div className="form-register-card">
                        <img src="/register-logo.png" alt="register logo" className="form-logo"/>
                        <h2 className="form-title">Create an Account</h2>
                        <div className="link-card">
                            <p>Already have an account?</p>
                            <Link to="/login" className="form-link">Login</Link>
                        </div>
                        <div className="register-input-card">
                            <div className="register-input-box">
                                <GoPerson size={20} className="icon"/>
                                <input type="text" placeholder="Username" name="username" value={form.username} onChange={handleChange}/>
                            </div>
                            <div className="register-input-box">
                                <MdOutlineMail size={20} className="icon"/>
                                <input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange}/>
                            </div>
                            <div className="register-input-box">
                                <FiLock size={20} className="icon"/>
                                <input type={showpassword ? "text" : "password"} placeholder="Password" name="password" value={form.password} onChange={handleChange}/>
                                <button type="button" className='eye-btn' onClick={toShowpassword}>
                                    <FaEye size={20} className="eye-icon"/>
                                </button>
                            </div>
                            <div className="register-input-box">
                                <FiLock size={20} className="icon"/>
                                <input type={showpassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}/>
                                <button type="button" className='eye-btn' onClick={toShowpassword}>
                                    <FaEye size={20} className="eye-icon"/>
                                </button>
                            </div>  
                            <button type="submit" className="register-btn">Create Account</button>
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
                        <p className="form-description">
                            By creating an account, you agree to our 
                            <Link to="/terms" className="form-link"> Terms of Service</Link> and <Link to="/privacy" className="form-link">Privacy Policy</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;