import React from 'react';
import {Menu, MenuButton, MenuItem, Button, MenuList, Image} from '@chakra-ui/react'
import {ListOrdered, LayoutDashboard, User, LogOut} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {logout} from "../../actions/userActions"
import "./userMenu.css";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = [
        {icon: <ListOrdered />, name: "Orders", func: orders},
        {icon: <User /> , name: "Profile", func: profile},
        {icon: <LogOut />, name: "Logout", func: logOut},
    ];

    if(user.role === "admin"){
        options.unshift( {icon: <LayoutDashboard />, name: "Dashboard", func: dashboard})
    }

    function dashboard() {
        navigate("/dashboard")
    }
    function orders() {
        navigate("/orders")
    }
    function profile() {
        navigate("/profile")
    }

    async function logOut() {
        await dispatch(logout());
        navigate("/");
        // return (
        toast.success("Logout Done", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        // }));
    }


  return (
    <>
    <div className='menu'>
        <Menu className="main">
            <MenuButton as={Button} style={{padding: "0px", borderRadius: "100%"}} className="menubtn" >
                <img 
                    src={user.avatar.url ? user.avatar.url : "./profile.png" }
                    className="photo"
                    alt=""
                />
            </MenuButton>
            <MenuList >
                {options.map((item)=>(
                    <MenuItem key={item.name} onClick={item.func}><span class='ic'>{item.icon}</span> {item.name}</MenuItem>
                ))}
                
            </MenuList>
        </Menu>
    </div>

    </>
  )
}

export default UserMenu