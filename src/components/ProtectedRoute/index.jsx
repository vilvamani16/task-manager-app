import {useEffect, useState} from 'react'

import {Navigate} from 'react-router-dom'

import axios from 'axios'

import Loader from "../Loader"

const ProtectedRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async() => {
            try{
                await axios.get( `${import.meta.env.VITE_API_URL}/api/me`, {withCredentials: true})
                setIsAuthenticated(true)
            }catch(error){
                setIsAuthenticated(false)
            }
        }
        checkAuth()
    }, [])
    if(isAuthenticated === null){
        return (<Loader/>)
    }
    if(!isAuthenticated){
        return (<Navigate to="/login" />)
    }
    return children
}

export default ProtectedRoute