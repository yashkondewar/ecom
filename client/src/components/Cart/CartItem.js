import React from 'react'
import { Link } from 'react-router-dom'
import { Button, HStack, Input } from '@chakra-ui/react'
import {  useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartActions'

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity+1
        if(stock <= quantity){
          return;
        }
        dispatch(addToCart(id, newQuantity));
    }

    const decreaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity-1
        if(newQuantity < 1){
          return;
        }
        dispatch(addToCart(id, newQuantity));
    }

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
    }

  return (
    <>
        <div className='CartItem'>
            <div className='itemImage'>
                <img src={item.image} alt="image"/>
            </div>

            <div className='itemData'>
                <div>
                <Link to={`/product/${item.product}`} > {item.name} </Link>
                </div>

                <div>
                <HStack  gap={'0'} alignItems={'center'}>
                    <Button borderRadius={'0.5rem 0 0 0.5rem'} fontSize= "1rem" onClick={( ) => {decreaseQuantity(item.product, item.quantity, item.stock)}}>-</Button>
                    <Input readOnly value={item.quantity} type='number' w={'4rem'} borderRadius={'0'} textAlign={'center'}></Input>
                    <Button borderRadius={'0 0.5rem 0.5rem 0'} fontSize= "1rem" onClick={( ) => {increaseQuantity(item.product, item.quantity, item.stock)}}>+</Button>
                </HStack>
                <p>{`Price: ${item.price}`}</p>
                </div>

                <div>
                <Button fontSize= "0.7rem" padding="0.1rem 1rem" backgroundColor={'#635dc0'} onClick={() => {removeItem(item.product)}}>Remove</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CartItem