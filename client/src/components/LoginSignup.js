import React, {useRef, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation} from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {Mail, KeyRound, User} from "lucide-react";
import {clearErrors, login, register} from "../actions/userActions";
import "./LoginSignup.css"

const LoginSignup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const {error, loading, isAuthenticated} = useSelector(state => state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcher = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    })
    const [avatar, setavatar] = useState("");
    const [avatarPreview, setavatarPreview] = useState("/profile.png");
    const [isActive1, setisActive1] = useState(true);
    const [isActive2, setisActive2] = useState(false);

    const {name, email, password, mobile} = user;
    const redirect = location.search ? location.search.split("=")[1] : "profile"

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    useEffect(() => {
        if(error){
            // console.log(error);
            const err = error;
            dispatch(clearErrors());
            toast.error(err, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, navigate, redirect])

    const switchForm = (e, tab) =>{
        if(tab === "login"){
            switcher.current.classList.add("shiftToNeutral");
            switcher.current.classList.remove("shiftToRight");

            // registerTab.current.classList.remove("shiftToNeutralForm");
            // loginTab.current.classList.remove("shiftToLeft");

            // registerTab.current.classList.add("dn");
            // loginTab.current.classList.remove("dn");
            setisActive1 (true);
            setisActive2 (false);
        }
        if(tab === "register"){
            switcher.current.classList.remove("shiftToNeutral");
            switcher.current.classList.add("shiftToRight");

            // registerTab.current.classList.add("shiftToNeutralForm");
            // loginTab.current.classList.add("shiftToLeft");

            // loginTab.current.classList.add("dn");
            // registerTab.current.classList.remove("dn");

            setisActive2 (true);
            setisActive1 (false);
        }
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myData = new FormData();
        myData.set("name", name);
        myData.set("email", email);
        myData.set("password", password);
        myData.set("avatar", avatar);
        myData.set("mobile", mobile);

        dispatch(register(myData));
    }

    const registerDataChange = (e) => {
        if(e.target.name === "avatar"){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setavatar(reader.result);
                    setavatarPreview(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        else{
            setUser({...user, [e.target.name] : e.target.value});
        }
    }


  return (
    <>
        {loading? (<div className='loader'></div>):
        (
            <>
            <div className='container'>
                <div className='boxx' style={{background: "rgba(18, 18, 33, 0.785)"}}>
                    <div>
                        <div className='switcher'>
                            <p onClick={(e) => switchForm(e, "login")}>Login</p>
                            <p onClick={(e) => switchForm(e, "register")}>Register</p>
                        </div>
                        <Button ref={switcher}></Button>

                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}
                            style={{display: isActive1 ? 'flex' : 'none'}}
                        >
                            <div className='loginEmail'>
                                <Mail className='svg' />
                                <input
                                    type={'mail'}
                                    placeholder="Email"
                                    required
                                    value = {loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className='loginPassword'>
                                <KeyRound className='svg' />
                                <input
                                    type={'password'}
                                    placeholder="Password"
                                    required
                                    value = {loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="login" className='loginBtn' />
                        </form>


                        <form className='signUpForm' ref={registerTab} encType="multipart/form-data"
                            onSubmit={registerSubmit}
                            style={{display: isActive2 ? 'flex' : 'none'}}
                         >
                            <div className='signUpName'>
                                <User className='svg' />
                                <input
                                    type={'text'}
                                    placeholder="Name"
                                    required
                                    name = "name"
                                    value = {name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpEmail'>
                                <Mail className='svg' />
                                <input
                                    type={'mail'}
                                    placeholder="Email"
                                    required
                                    name = "email"
                                    value = {email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <KeyRound className='svg' />
                                <input
                                    type={'password'}
                                    placeholder="Password"
                                    required
                                    name = "password"
                                    value = {password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <KeyRound className='svg' />
                                <input
                                    type={'number'}
                                    placeholder="Mobile"
                                    required
                                    name = "mobile"
                                    value = {mobile}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div id='registerImage'>
                            <img src={avatarPreview} alt="Avatar Preview"/>
                                <input 
                                    type="file"
                                    name="avatar"
                                    accept='image/'
                                    onChange={registerDataChange}
                                />
                            </div>

                            
                            <input type="submit" value="Register" className='signUpBtn'  />
                        </form>
                    </div>
                </div>
            </div>
                
            </>
        )}
    </>
  )
}

export default LoginSignup