import React, {   useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
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
      body: JSON.stringify({ amount:total, currency: 'INR', receipt: 'receipt#1', notes: {} })
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
  return (
    <div>
      <h3>Cart Products</h3>
      <table border={1} cellPadding={10}>
        <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {(cart.length!=0)?cart.map((item,index)=>{
          return <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>Rs. {item.price}</td>
          </tr>
        }):''}
        <tr>
          <td colSpan={2}>Total</td>
          <td><strong>Rs. {total}</strong></td>
        </tr>
        </tbody>
      </table>
      <Link to='/checkout'>Checkout</Link>
    </div>
  )
}
