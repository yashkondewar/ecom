import React, {useEffect, useRef} from 'react'
import Example from "./checkoutSteps"
import { useDispatch, useSelector } from "react-redux"
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import axios from 'axios'
import { Calendar, CreditCard, Key } from "lucide-react"
import "./Payment.css"
import { clearErrors, createOrder } from '../../actions/orderActions';

const Payment = () => {
    const current = 3;
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null)

    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const {shippingInfo, cartItems} = useSelector((state) => state.cart)
    const {user} = useSelector((state) => state.user)
    const {error} = useSelector((state) => state.newOrder)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice*100)
    }

    const order = {
        totalPrice: orderInfo.totalPrice,
        shippingPrice: orderInfo.shippingCharges,
        taxPrice: orderInfo.tax,
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
    }

    const submithandler = async(e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try{
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                },
            }

            const {data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config,
            )

            const client_secret = data.client_secret;
            
            console.log(client_secret)

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingInfo.address,
                            city:shippingInfo.city,
                            state: shippingInfo.state,
                            country: shippingInfo.country,
                        },
                    }
                }
            })

            console.log(result);

            if(result.error){
                payBtn.current.disabled = false;
                toast.error(result.error, {
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
            else{
                if(result.paymentIntent.status === "succeeded"){
                    
                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))
                    navigate("/order/success")
                }
                else{
                    toast.error("Technical Issue: Payment Failed", {
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
            }
        }
        catch(error){
            payBtn.current.disabled = false;
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
    }, [dispatch, error])


    return (
        <>
            <div  className="steps">
                <Example current={current}/>
            </div>
            <div className='paymentContainer'>
            <div className='paymentBox'>

                <h2>Card Info</h2>
                <form className='paymentForm' onSubmit={(e)=>submithandler(e)}>
                    
                    <div>
                        <CreditCard className='svg' />
                        <CardNumberElement className='paymentInput'/>
                    </div>

                    <div>
                        <Calendar className='svg' />
                        <CardExpiryElement className='paymentInput'/>
                    </div>

                    <div>
                        <Key className='svg' />
                        <CardCvcElement className='paymentInput'/>
                    </div>

                    <input type="submit" value={`Pay - ${orderInfo  &&  orderInfo.totalPrice}` } ref={payBtn} className="payBtn"></input>

                </form>
                </div>
            </div>
        </>
    )
}

export default Payment