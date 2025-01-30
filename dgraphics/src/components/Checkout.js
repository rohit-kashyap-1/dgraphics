import axios from 'axios'
import React, {    useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Checkout() {
  const [addresses,setAddresses] = useState([])
  const [address,setAddress] = useState('')
  useEffect(function(){
    //if user is not loggedin then redirect login
    if(localStorage.getItem('token')){
      //verify
      const token =  localStorage.getItem('token')
      axios.post('http://localhost:5000/verify-customer',{token:token}).then((response)=>{
        if(response.data.type==true){
          //nothig to do
          //user tokenized data, userId, call api of address

          axios.post('http://localhost:5000/all-address',{userId:response.data.userId}).then((response)=>{
            setAddresses(response.data.addresses)
          })

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

  const [cart,setCart] = useState(function(){
        if(localStorage.getItem('products')!=undefined && localStorage.getItem('products')!=null){
          const products = JSON.parse(localStorage.getItem('products'))
          console.log(products)
          return products
        }else{
          return []
        }
    })
    const [total,setTotal] = useState(function(){
      let total =0
      cart.forEach(function(item){
        total+=item.price
      })
      return total
    })

    useEffect(() => {
      // Dynamically add Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);

    const handleCheckout = async ()=>{


      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount:total*100, currency: 'INR', receipt: 'receipt#1', notes: {} })
      });

      const order = await response.json();


      var options = {
        "key": "rzp_test_Lt396pFHNPwyzS", // Enter the Key ID generated from the Dashboard
        "amount": 5000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "D Graphics Pvt Ltd",
        "description": "Product Purchase ",
        "image": "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/UHFbanner-MSlogo?fmt=png-alpha&bfc=off&qlt=100,1",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
            //save to database
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open()
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });

    }

  const handleLogout = () =>{
    localStorage.removeItem('token')
    window.location = '/login'
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h3>Checkout</h3>

      <h4>Select Where you want to delivery your order?</h4>
      <div className='grid'>
      {(addresses.length!=0)?addresses.map((item,index)=>{
        return <label key={index} className='item'>
          <input type='radio' name='address' value={item.id} onChange={(e)=>{setAddress(e.target.value)}} />
              <h5>{item.name}</h5>
              <h6>{item.phone}</h6>
              <p>{item.address} - {item.pincode}</p>
              <p><strong>City: </strong>{item.city}</p>
        </label>
      }):<h5>No Address Found</h5>}
      </div>
      <Link to={'/add-address'} className='link'>Add Address</Link>
      <hr />
      <button onClick={handleCheckout}>Make Payment Rs.{total}</button>
    </div>
  )
}
