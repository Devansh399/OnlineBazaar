
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate , Link } from 'react-router-dom'
import '../styles/auth.css'

const Login = () => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()  // avoid page refresh on form submission
        try{
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await res.json();
            if (res.ok) {                                                                   
                login(data);
                navigate('/');
            } else {
                alert(data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during login:', err);
        }
    };

  return (
    <div className='auth-container'>
      <form action="" onSubmit={handleSubmit} className='auth-form'>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='btn'>Login</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  )
}

export default Login