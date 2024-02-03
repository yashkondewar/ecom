import React from 'react'
import Example from "./checkoutSteps"
import "./confirmOrder.css"
import { useSelector, useDispatch } from 'react-redux/'
import { Link, useNavigate } from 'react-router-dom'


const ConfirmOrder = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const {shippingInfo, cartItems} = useSelector((state)=>state.cart)
    const {user} = useSelector((state) => state.user)
    const current = 2;

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city} - ${shippingInfo.pin}, ${shippingInfo.state}, ${shippingInfo.country}`;
    
    const proceedToPayment = () => {
        const data ={
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate("/order/payment")
    }

    return (
    <>
        <div  className="steps">
            <Example current={current}/>
        </div>
        <div className='confirmOrder'>
            <div>
                <div className='confirmAddress'>
                    <h2>Shipping Info</h2>
                
                    <div className='confirmAddressBox'>
                        <div>
                            <p>Name: </p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone: </p>
                            <span>{shippingInfo.phone}</span>
                        </div>
                        <div>
                            <p>Address: </p>
                            <span>{address}</span>
                        </div>

                    </div>

                    <div className="confirmItems">
                        <h2>Your Cart Items</h2>
                        <div className='cartItemContainer'>
                            {cartItems  &&  
                                cartItems.map((item) => (
                                    <div key = {item.product}>
                                        <img src={item.image} alt="product"/>
                                        <Link to={`/product/${item.product}`}> {item.name} </Link>
                                        <span>
                                            {item.quantity} X {item.price} = <b>{item.quantity * item.price}</b>
                                        </span>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="orderSummary">
                    <h2>Order Summary</h2>
                    <div>
                    <div>
                        <p>Subtotal:</p>
                        <span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges:</p>
                        <span>₹{shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST:</p>
                        <span>₹{tax}</span>
                    </div>
                    </div>

                    <div className="orderSummaryTotal">
                    <p>
                        <b>Total:</b>
                    </p>
                    <span>₹{totalPrice}</span>
                    </div>

                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>

        </div>
    </>
    )
}

export default ConfirmOrder