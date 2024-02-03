import React, { useEffect } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useMediaQuery,
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearErrors,deleteOrder, getAllOrders, updateOrder } from '../../actions/orderActions'
import { Pen, Trash2 } from 'lucide-react'
import "./AdminOrders.css"
import { toast } from 'react-toastify'
import { DELETE_ORDER_RESET, UPDATE_ORDER_RESET } from '../../constants/orderConstants'

const AdminOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, orders, loading} = useSelector((state) => state.allOrders)
    const{error: deleteError, isDeleted} = useSelector((state)=>state.order)
    const { loading:orderLoading, error: updateError, isUpdated } = useSelector((state) => state.order);
    const [isSmallerThan600] = useMediaQuery('(max-width: 450px)')
    var style = {}
    if(isSmallerThan600){
      style = {
        fontSize: "0.5rem"
      }
    }

    const orderUpdateHandler = async(id, currentStatus) => {

        if(currentStatus === "Processing"){
            await dispatch(updateOrder(id, "shipped"));
        }
        if(currentStatus === "shipped"){
            await dispatch(updateOrder(id, "delivered"));
        }

        dispatch(getAllOrders())
        
    }

    const deleteHandler = (id) => {
        // console.log((id));
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if(error){
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (deleteError) {
            toast.error(deleteError, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clearErrors());
        }
    
        if (isDeleted) {
            toast.success("Order deleted Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/dashboard");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        if (updateError) {
            toast.error(updateError, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clearErrors());
        }
    
        if (isUpdated) {
            toast.success("Order Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/dashboard");
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        if(orderLoading === false){
            dispatch(getAllOrders())
        }
        dispatch(getAllOrders())
        
    }, [dispatch, error, isDeleted, deleteError, isUpdated, updateError, navigate, orderLoading])
  return (
    <>
        {loading ? (<div className='loader'></div>):(
        <>
        
        <TableContainer className='tblCont' style={{width: "100%"}}>
            <Table variant='simple' style ={style} >
            <TableCaption><h2>Orders</h2></TableCaption>
                <Thead>
                <Tr className="row">
                    <Th>Orders</Th>
                    <Th>Status</Th>
                    <Th isNumeric>Items Ordered</Th>
                    <Th isNumeric>Total Price</Th>
                    <Th >Actions</Th>
                </Tr>
                </Thead>
                <Tbody>

                {orders && 
                    orders.map((item, index) => (
                  <Tr>
                    <Td ><Link to={`/order/${item._id}`}>{item._id}</Link></Td>
                    <Td className={`${item.orderStatus === "delivered" ? "Delivered" : "Processing"}`} >{item.orderStatus}</Td>
                    <Td isNumeric>{item.orderItems.length}</Td>
                    <Td isNumeric>{item.totalPrice}</Td>
                    <Td className='actions'> <button onClick={() => orderUpdateHandler(item._id, item.orderStatus)}><Pen/></button> <button onClick={() => deleteHandler(item._id)}><Trash2/></button></Td>
                  </Tr>
                ))}
                
                </Tbody>
                
            </Table>
        </TableContainer>
        </>
      )}
    </>
  )
}

export default AdminOrders