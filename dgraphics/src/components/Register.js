import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [cnf_password, setCNFPassword] = useState('')
  const handleLogin = (e) => {
    e.preventDefault()
    if (!name) {
      return alert('Enter name')
    }
    if (!email) {
      return alert('Enter email')
    }
    if (!password) {
      return alert('password')
    }
    if (!cnf_password) {
      return alert('re enter password')
    }
    if (password !== cnf_password) {
      return alert('password do not match')
    }
    axios.post('http://localhost:5000/register-customer', { name, email, password, cnf_password }).then(async (response) => {
      const data = response.data
      if (data.type == true) {
        await localStorage.setItem('token', data.token)
        window.location = '/checkout'
      } else {
        alert(data.msg)
      }
    })
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type='name' value={name} onChange={(e) => { setName(e.target.value) }} />

        <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <input type='password' value={cnf_password} onChange={(e)=>{setCNFPassword(e.target.value)}} placeholder='cnf password'/>
        <button>Login</button>
      </form>
      <Link to={'/login'} style={{ color: 'orange' }}>Login</Link>
    </div>
  )
}
