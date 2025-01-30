import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function AddAddress() {
  const [data,setData] =useState({userId:'',name:'',phone:'',address:'',pincode:'',city:''})
  useEffect(function(){
    //if user is not loggedin then redirect login
    if(localStorage.getItem('token')){
      //verify
      const token =  localStorage.getItem('token')
      axios.post('http://localhost:5000/verify-customer',{token:token}).then((response)=>{
        if(response.data.type==true){
          setData({...data,userId:response.data.userId})
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
  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/add-address',data).then((response)=>{
      if(response.data.type){
        window.location = '/checkout'
      }else{
        alert(response.data.msg)
      }
    })
  }
  return (
    <div>
      <h4>Add New Address</h4>
      <form onSubmit={handleSubmit}>
        <table className='table'>
          <tbody>
          <tr>
            <th>Name</th>
            <td><input type='text' value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}}/></td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td><input maxLength={10} type='text' value={data.phone} onChange={(e)=>{setData({...data,phone:e.target.value})}} placeholder='10 digit number phone'/></td>
          </tr>
          <tr>
            <th>Address</th>
            <td><input type='text' value={data.address} onChange={(e)=>{setData({...data,address:e.target.value})}}/></td>
          </tr>
          <tr>
            <th>City Name</th>
            <td><input type='text' value={data.city} onChange={(e)=>{setData({...data,city:e.target.value})}}/></td>
          </tr>
          <tr>
            <th>Pincode</th>
            <td><input type='text' value={data.pincode} onChange={(e)=>{setData({...data,pincode:e.target.value})}}/></td>
          </tr>
          <tr>
            <th></th>
            <td>
              <button>Submit</button>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}
