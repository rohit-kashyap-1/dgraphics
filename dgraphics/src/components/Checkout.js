import axios from 'axios'
import React, {   useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Checkout() {
  useEffect(function(){
    //if user is not loggedin then redirect login
    if(localStorage.getItem('token')){
      //verify
      const token =  localStorage.getItem('token')
      axios.post('http://localhost:5000/verify-customer',{token:token}).then((response)=>{
        if(response.data.type==true){
          //nothig to do
        }else{
          console.log(response)
          window.location = '/login'
        }
      })
    }else{
      console.log('token not found in storage')
      window.location = '/login'
    }
  },[])

  const handleLogout = () =>{
    localStorage.removeItem('token')
    window.location = '/login'
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h3>Checkout</h3>

    </div>
  )
}
