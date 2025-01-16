import React, {   useState } from 'react'

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

    </div>
  )
}
