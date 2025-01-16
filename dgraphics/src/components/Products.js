
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [cart,setCart] =  useState(function(){
    //check if products exist in localstorage then set to state
    //else set []

    if(localStorage.getItem('products')!=undefined && localStorage.getItem('products')!=null){
      const products = JSON.parse(localStorage.getItem('products'))
      console.log(products)
      return products
    }else{
      return []
    }

  })
  const [total,setTotal] = useState(0)
  useEffect(function () {
    fetch('http://localhost:5000/all-products').then((response) => response.json()).then(function (data) {
      setProducts(data)

    })
  },[])

  useEffect(function(){
    if(cart){
      localStorage.setItem('products',JSON.stringify(cart))
    }
  },[cart])
  const addToCart = (product)=>{
    setCart([...cart,product])

    setTotal(total+product.price)
  }

  const styles = {
    container: {
      display: 'grid',
      gridTemplateColumns: '200px 200px 200px 200px',
      gap: 20
    },
    item: {
      border: '1px solid #ccc',
      borderRadius: 4,
      padding: 20
    }
  }
  return (
    <>
    <h4 ><Link style={{ color:'coral' }} to={'/cart'}>Cart: {cart.length}</Link></h4>
    <h5>Total: {total}</h5>
    <div style={styles.container}>
      {(products.length != 0) ? products.map((item,index) => {
        return <div key={index} style={styles.item}>
          <p>{item.name}</p>
          <strong>{item.series}</strong>
          <hr/>
          <strong>Rs.{item.price}</strong>
          <div>
            <button onClick={()=>{addToCart(item)}}>Add to Cart</button>
            </div>
        </div>
      }) : 'Loading Products....'}
    </div>
    </>
  )
}
