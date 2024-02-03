import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
import {Mail, User} from "lucide-react";
import {clearErrors, loadUser, updateProfile} from "../../actions/userActions";
import "./UpdateProfile.css"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user);
    const {error, isUpdated, loading} = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    
    const [avatar, setavatar] = useState("");
    const [avatarPreview, setavatarPreview] = useState("/profile.png");


    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setavatarPreview(user.avatar.url);
            setMobile(user.mobile);
        }

        if(error){
            console.log(error);
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

        if(isUpdated){
            toast.success("Profile Updated Successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(loadUser())
            navigate("/profile");

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, user, isUpdated, navigate ])

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myData = new FormData();
        myData.set("name", name);
        myData.set("email", email);
        myData.set("avatar", avatar);
        myData.set("mobile", mobile);

        dispatch(updateProfile(myData));
    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setavatar(reader.result);
                setavatarPreview(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
        
    }
  return (
    <>
    {loading? (<div className='loader'></div>):
        (
            <>
        <div className='container'>
            <div className='box'>
                <p className='headingU'>Update Profile</p>

                <form className='updateProfileForm' encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                    >
                    <div className='updateProfileName'>
                        <User className='svg' />
                        <input
                            type={'text'}
                            placeholder="Name"
                            required
                            name = "name"
                            value = {name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='updateProfileEmail'>
                        <Mail className='svg' />
                        <input
                            type={'mail'}
                            placeholder="Email"
                            required
                            name = "email"
                            value = {email}
                            onChange={(e)=>setEmail(e.target.value)}

                        />
                    </div>

                    <div className='updateProfileEmail'>
                        <Mail className='svg' />
                        <input
                            type={'number'}
                            placeholder="Mobile"
                            required
                            name = "mobile"
                            value = {mobile}
                            onChange={(e)=>setMobile(e.target.value)}

                        />
                    </div>
                    
                    <div id='updateProfileImage'>
                    <img src={avatarPreview} alt="Avatar Preview"/>
                        <input 
                            type="file"
                            name="avatar"
                            accept='image/'
                            onChange={updateProfileDataChange}
                        />
                    </div>

                    
                    <input type="submit" value="Update Profile" className='updateProfileBtn'  />
                </form>

            </div>
        </div>
        </>)}
    </>
  )
}

export default UpdateProfile