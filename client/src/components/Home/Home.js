import React, {useEffect} from 'react';
import Product from "./Product.js"
import { TypeAnimation } from 'react-type-animation';
import "./Home.css";
import MetaData from '../layout/MetaData.js';
import { getProduct } from '../../actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const dispatch = useDispatch();
    const {loading, error, products, productsCount} = useSelector((state) => state.products)
    
    useEffect(() => {
        if(error){
            return toast.error(error, {
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
        dispatch(getProduct())
    }, [dispatch, error])

  return (
    <>
        {loading? (<div className='loader'></div>):(
            <>
                <MetaData title="SoleKikZ"/>
                <div className='banner'>
                    <p>Welcome to  

                    <TypeAnimation className='typeAnnimation'
                    preRenderFirstString={true}
                    sequence={[
                    500,
                    '  SoleKikZ', // initially rendered starting point
                    2000,
                    ' ',
                    500,
                    ]}
                    speed={50}
                    // style={{ fontSize: '2em' }}
                    repeat={Infinity}
                    />
                    </p>
                    <h1>Find the Shoe you Need</h1>

                    <a href='#container'>
                        <button>
                            Explore
                        </button>
                    </a>

                </div>

                <h2 className='homeHeading'>Top Products</h2>

                <div className='containertt' id ="container" >
                    
                    {products &&  products.map((product)=>
                        
                        <Product product={product}/>
                    )}
                    
                </div>
            </>
        )}
    </>
  )
}

export default Home