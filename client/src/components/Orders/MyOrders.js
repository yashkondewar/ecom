import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, myOrders} from "../../actions/orderActions"
import { Link } from "react-router-dom"
import "./MyOrders.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const MyOrders = () => {
    const dispatch = useDispatch();
    const {loading, error, orders} = useSelector((state)=>state.myorders)
    const {user} = useSelector((state)=>state.user)
    const [isSmallerThan600] = useMediaQuery('(max-width: 450px)')

    var style = {};
    if(isSmallerThan600){
      style = {
        fontSize: "0.5rem"
      }
    }
    // console.log(orders)
    useEffect(() => {
      if(error){
        const err = error
        dispatch(clearErrors)
        return toast.error(err, {
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
    dispatch(myOrders())
    }, [dispatch, error])

  return (
    <>
      {loading? (<div className='loader'></div>):(
        <>
        <TableContainer className='tblCont' style={{width: "100%"}}>
            <Table variant='simple' style ={style} >
            <TableCaption>Orders of <h2>{user.name}</h2></TableCaption>
                <Thead>
                <Tr className="row">
                    <Th>Order</Th>
                    <Th isNumeric>Quantity</Th>
                    <Th isNumeric>Cost</Th>
                    <Th >Status</Th>
                </Tr>
                </Thead>
                <Tbody>

                {orders && 
                orders.map((item, index) => (
                  <Tr>
                    <Td ><Link to={`/order/${item._id}`}>{item._id}</Link></Td>
                    <Td isNumeric>{item.orderItems.length}</Td>
                    <Td isNumeric>{item.totalPrice}</Td>
                    <Td className={`${item.orderStatus}`}>{item.orderStatus}</Td>
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

export default MyOrders