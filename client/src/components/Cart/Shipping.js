import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { saveShippingInfo } from '../../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import {Country, State} from "country-state-city"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Shipping.css"
import { Locate, Mailbox, MapPin, Phone, Stamp} from "lucide-react"
import Example from "./checkoutSteps.js"

const Shipping = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {shippingInfo} = useSelector((state)=> state.cart)

    const [address, setaddress] = useState(shippingInfo.address)    
    const [phone, setphone] = useState(shippingInfo.phone)    
    const [city, setcity] = useState(shippingInfo.city)    
    const [state, setstate] = useState(shippingInfo.state)    
    const [country, setcountry] = useState(shippingInfo.country)    
    const [pin, setpin] = useState(shippingInfo.pin)  
    
    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phone.length !== 10){
            toast.error("Contact Number should be 10 digits long", {
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

        dispatch(
            saveShippingInfo({address, city, state, country, phone, pin})
        )

        navigate("/order/confirm")
    };
    const current = 1;

    return (
        <>
            <div  className="steps">
                <Example current={current}/>
            </div>
            
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2 className='shippingHeading'>Shipping Details</h2>
                

                <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                            <div className='loginEmail'>
                                <MapPin className='svg'/>
                                <input
                                    type={'text'}
                                    placeholder="Address"
                                    required
                                    value = {address}
                                    onChange={(e) => setaddress(e.target.value)}
                                />
                            </div>
                            <div  >
                                <Phone className='svg' />
                                <input
                                    type={'number'}
                                    placeholder="Phone"
                                    required
                                    value = {phone}
                                    onChange={(e) => setphone(e.target.value)}
                                />
                            </div>
                            <div  >
                                <Mailbox className='svg' />
                                <input
                                    type={'number'}
                                    placeholder="Pin"
                                    required
                                    value = {pin}
                                    onChange={(e) => setpin(e.target.value)}
                                />
                            </div>
                            <div  >
                                <Locate className='svg' />
                                <input
                                    type={'text'}
                                    placeholder="City"
                                    required
                                    value = {city}
                                    onChange={(e) => setcity(e.target.value)}
                                />
                            </div>
                            <div>
                            <Locate className='svg' />

                            <select
                                required
                                value={country}
                                onChange={(e) => setcountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                    </option>
                                ))}
                            </select>
                            </div>

                            {country && (
                            <div>
                            <Stamp className='svg' />

                                <select
                                required
                                value={state}
                                onChange={(e) => setstate(e.target.value)}
                                >
                                <option value="">State</option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            )}

                            <input type="submit" value="continue" className='shoppingBtn' disabled={state ? false: true} />
                    </form>

                </div>
            </div>
        </>
    )
}

export default Shipping