import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/auth/login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Course from './pages/Course';

function App() {

  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={user ? <Navigate to={'/'} /> : <Login />} />
        <Route path='/course' element={<Course />} />
      </Routes>
    </>
  )
}

export default App;
