import React from 'react'
import "./Cart.css"
import CartItem from "./CartItem.js"
import {  useSelector } from 'react-redux'
import { Button, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const {cartItems} = useSelector((state) => state.cart)
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping")
    }

  return (
    <>
        <Heading>Cart</Heading>
        <div className='cartPage'>
        {console.log(cartItems)}
        {   
            cartItems && cartItems.map((item) =>(
                <div className='cartItems'>
                    <CartItem item={item}/>
                </div>
            ))
        }
        
            
            <div className='totalPrice'>
                <p>Total Price: <span className='amount'>{`${cartItems.reduce( (acc, item) => acc + item.quantity * item.price, 0)}`}</span></p>
            
                <Button fontSize= "0.7rem" padding="0.1rem 1rem" backgroundColor={'#635dc0'} style={{width: "10rem"}} onClick={()=> {checkoutHandler()}}>Check Out</Button>
                
            </div>
        </div>
    </>
  )
}

export default Cart