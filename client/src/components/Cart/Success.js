import React from 'react'
import { CheckCircle } from "lucide-react"
import "./Success.css"
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className='successContainer'>
            <div className='sicon'><CheckCircle className='tmp'/></div>
            <div><h2>Order Placed Successfully</h2></div>
            <Button className='successbtn' onClick={()=>navigate("/orders")}>View Details</Button>

        </div>
    </>
  )
}

export default Success