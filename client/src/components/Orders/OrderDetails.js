import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import { clearErrors, getOrderDetails } from "../../actions/orderActions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./OrderDetails.css"

const OrderDetails = () => {
    const dispatch = useDispatch()
    const {loading, error, order } = useSelector((state) => state.orderDetails)
    const {id} = useParams();
    console.log(order)
    useEffect(() => {
        if(error){
          const err = error
          dispatch(clearErrors)
          return toast.error(err, {
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
      dispatch(getOrderDetails(id))
      }, [dispatch, error])
  return (
    <>
        {loading? (<div className='loader'></div>):(
            <>
            <div className='confirmOrder'>
                <div>
                    <div className='confirmAddress'>
                        <h2>Shipment Details</h2>
                    
                        <div className='confirmAddressBox'>
                            <div>
                                <p>Name: </p>
                                <span>{order.user  &&  order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone: </p>
                                <span>{order.shippingInfo  &&  order.shippingInfo.phone}</span>
                            </div>
                            <div>
                                <p>Address: </p>
                                <span>{order.shippingInfo  &&  order.shippingInfo.address}</span>
                            </div>

                        </div>

                        <div className="confirmItems">
                            <h2>Ordered Items</h2>
                            <div className='cartItemContainer'>
                                {order.orderItems  &&  
                                    order.orderItems.map((item) => (
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
                    <h2>Payment </h2>
                        <div>
                            {order.paymentInfo && <div>
                                <p>Payment: ₹{order  &&  order.totalPrice}</p>
                                <span className={`${order.paymentInfo  &&  order.paymentInfo.status === "succeeded" ? "Delivered" : "Processing"}`}>{order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</span>
                            </div>}
                        </div>
                    <h2>Shipment </h2>
                        <div>
                            <div>
                                <p>Shipment Status: ₹{order.totalPrice}</p>
                                <span className={`${order.orderStatus === "delivered" ? "Delivered" : "Processing"}`}>{order.orderStatus}</span>
                            </div>
                        </div>

                    <h2>Order Summery</h2>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{order.itemPrice}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{order.shippingPrice}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{order.taxPrice}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹{order.totalPrice}</span>
                        </div>
                    </div>
                </div>

            </div>
            </>
        )}
    </>
  )
}

export default OrderDetails