import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
import {KeyRound, Unlock, Lock} from "lucide-react";
import {clearErrors, updatePassword} from "../../actions/userActions";
import "./UpdatePassword.css"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {error, isUpdated, loading} = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if(error){
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
            navigate("/profile");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, isUpdated, navigate ])

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myData = new FormData();
        myData.set("oldPassword", oldPassword);
        myData.set("newPassword", newPassword);
        myData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myData));
    }

    
  return (
    <>
    {loading? (<div className='loader'></div>):
        (
            <>
        <div className='container'>
            <div className='box'>
                <p className='headingU'>Update Password</p>

                <form className='updatePasswordForm' encType="multipart/form-data"
                    onSubmit={updatePasswordSubmit}
                    >
                    <div className='loginPassword'>
                        <KeyRound className='svg' />
                        <input
                            type={'password'}
                            placeholder="Old Password"
                            required
                            value = {oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                    <Unlock className='svg' />
                        <input
                            type={'password'}
                            placeholder="New Password"
                            required
                            value = {newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className='loginPassword'>
                        <Lock className='svg' />
                        <input
                            type={'password'}
                            placeholder="Confirm Password"
                            required
                            value = {confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    
                    <input type="submit" value="Change" className='updatePasswordBtn'  />
                </form>

            </div>
        </div>
        </>)}
    </>
  )
}

export default UpdatePassword