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
import { clearErrors, deleteProduct, getProduct } from '../../actions/productActions'
import { Pen, Trash2 } from 'lucide-react'
import "./AdminProducts.css"
import { toast } from 'react-toastify'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const AdminProducts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, products, loading} = useSelector((state) => state.products)
    const{error: deleteError, isDeleted} = useSelector((state)=>state.product)
    const [isSmallerThan600] = useMediaQuery('(max-width: 450px)')
    var style = {};
    if(isSmallerThan600){
      style = {
        fontSize: "0.5rem"
      }
    }

    const deleteHandler = (id) => {
        // console.log((id));
        dispatch(deleteProduct(id))
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
            toast.success("Product deleted Successfully", {
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
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getProduct())
    }, [dispatch, error, isDeleted, deleteError])
  return (
    <>
        {loading? (<div className='loader'></div>):(
        <>
        
        <TableContainer className='tblCont' style={{width: "100%"}}>
            <div className='create'>
                <button className='newProd' onClick={()=>navigate("/Admin/products/create")}>Create</button>
            </div>
            <Table variant='simple' style ={style} >
            <TableCaption><h2>Products</h2></TableCaption>
                <Thead>
                <Tr className="row">
                    <Th>Product</Th>
                    <Th isNumeric>Quantity</Th>
                    <Th isNumeric>Cost</Th>
                    <Th >Actions</Th>
                </Tr>
                </Thead>
                <Tbody>

                {products && 
                    products.map((item, index) => (
                  <Tr>
                    <Td ><Link to={`/product/${item._id}`}>{item._id}</Link></Td>
                    <Td isNumeric>{item.Stock}</Td>
                    <Td isNumeric>{item.price}</Td>
                    <Td className='actions'> <button onClick={()=>navigate(`/Admin/product/${item._id}`)}><Pen/></button> <button onClick={() => deleteHandler(item._id)}><Trash2/></button></Td>
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

export default AdminProducts