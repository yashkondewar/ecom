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
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userActions'

const AdminUsers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error, users, loading} = useSelector((state) => state.allUsers)
    const{error: deleteError, isDeleted} = useSelector((state)=>state.usersAdmin)
    const [isSmallerThan600] = useMediaQuery('(max-width: 450px)')
    var style = {};
    if(isSmallerThan600){
      style = {
        fontSize: "0.5rem"
      }
    }

    const deleteHandler = (id) => {
        // console.log((id));
        dispatch(deleteUser(id))
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
            toast.success("User deleted Successfully", {
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
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers())
        
    }, [dispatch, error, isDeleted, deleteError, navigate])
  return (
    <>
        {loading ? (<div className='loader'></div>):(
        <>
        
        <TableContainer className='tblCont' style={{width: "100%"}}>
            <Table variant='simple' style ={style} >
            <TableCaption><h2>Users</h2></TableCaption>
                <Thead>
                <Tr className="row">
                    <Th>User</Th>
                    <Th>Name</Th>
                    <Th >Actions</Th>
                </Tr>
                </Thead>
                <Tbody>

                {users && 
                    users.map((item, index) => (
                  <Tr>
                    <Td >{item._id}</Td>
                    <Td >{item.name}</Td>
                    <Td className='actions'> <button onClick={() => deleteHandler(item._id)}><Trash2/></button></Td>
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

export default AdminUsers