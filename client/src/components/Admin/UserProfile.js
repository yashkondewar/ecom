import React, { useEffect } from 'react'
import "../Profile/profile.css"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import {Box, Button, Heading, Image} from "@chakra-ui/react"

const UserProfile = () => {
    const navigate = useNavigate();
    const {user, loading, isAuthenticated} = useSelector((state) => state.user);
    // console.log(user);

    useEffect(() => {
        if(isAuthenticated === false){
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])

    return (
        <>
        {loading ? (<div className='loader'></div>):(
            <>
            <div className='main'>

                    <Box className='photo'>
                        <div>
                        <Heading fontSize={'1.2rem'}>My UserProfile</Heading>
                        </div>
                        <div className='ph'>
                        <Image 
                            src={user.avatar.url ? user.avatar.url : "./profile.png" }
                            borderRadius="100%"
                            >
                        </Image>
                        <Link to= "/profile/update">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>Edit Profile</Button>
                        </Link>
                        </div>
                    </Box>

                    <Box className='details'>
                        <div>
                            <Heading className='t1'>Name : </Heading>
                            <Heading className='t2'>{user.name}</Heading>
                        </div>
                        <div>
                            <Heading className='t1'>Email</Heading>
                            <Heading className='t2'>{user.email}</Heading>
                        </div>
                        <div>
                            <Heading className='t1'>Mobile</Heading>
                            <Heading className='t2'>{user.mobile}</Heading>
                        </div>
                        
                        <div className='btn'>
                        <Link to= "/orders">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>My Orders</Button>
                        </Link>
                        </div>
                        <div className='btn'>
                        <Link to= "/profile/changepassword">
                            <Button backgroundColor={'#635dc0'} marginTop={'1rem'} padding={'0.8rem'}>Change Password</Button>
                        </Link>
                        </div>
                    </Box>
                    

                </div>
            </>
        )}
    </>
  )
}

export default UserProfile