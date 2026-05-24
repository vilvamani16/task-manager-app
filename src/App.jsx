import {Routes, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'

const App = () =>{
  return(
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/> 
        <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App  