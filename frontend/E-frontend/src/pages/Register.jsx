import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate , Link } from 'react-router-dom'
import '../styles/auth.css'

const Register = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
        e.preventDefault()  // avoid page refresh on form submission
        try{
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const data = await res.json()
          if (res.ok) {
            alert('Registration successful! You can now log in.')
            login(data) // set the user data in the context
            navigate('/')
          } else {
            alert(data.message || 'Registration failed. Please try again.')
          }
        } catch (err) {
          console.error('Error during registration:', err)
          
        }
  }

  
    return (


    <div className='auth-container'>
      <form action="" onSubmit={handleSubmit} className='auth-form'>
        <h1>Register</h1>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='btn'>Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  )
}

export default Register