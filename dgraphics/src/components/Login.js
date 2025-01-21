import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const  [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const handleLogin =  (e)=>{
    e.preventDefault()
    if(!email){
      return alert('Enter email')
    }
    if(!password){
      return alert('password')
    }
    axios.post('http://localhost:5000/login-customer',{email,password}).then(async (response)=>{
      const data = response.data
      if(data.type==true){
        await localStorage.setItem('token',data.token)
        window.location = '/checkout'
      }else{
        alert(data.msg)
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button>Login</button>
      </form>
      <Link to={'/register'} style={{ color:'orange' }}>Register</Link>
    </div>
  )
}
