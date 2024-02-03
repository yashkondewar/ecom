import { Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getProduct} from "../../actions/productActions"
import {getAllOrders} from "../../actions/orderActions"
import {getAllUsers} from "../../actions/userActions"
import Products from '../Products/Products'
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  return (
    <>
    <div className='dashboard'>
      <Heading>SoleKikz</Heading>
      <div className='options'>
        <button className='btnAdmin' onClick={() => navigate("/Admin/products")}>Products <br/> {products  &&  products.length}</button>
        <button className='btnAdmin' onClick={() => navigate("/Admin/orders")}>Orders <br/> {orders  &&  orders.length}</button>
        <button className='btnAdmin' onClick={() => navigate("/Admin/users")}>Users <br/> {users  &&  users.length}</button>
      </div>
    </div>
      
    </>
  )
}

export default Dashboard