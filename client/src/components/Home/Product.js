import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.css";



const Product = ({product}) => {

  const options = {
    edit: false,
    color: "grey",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth<600? 20 : 25,
  }
  
  return (
    
    <div className="productCard">
    {/* {console.log(product)} */}
    <Link  to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <span>{`₹${product.price}`}</span>
        <div>
            <ReactStars {...options}/> <span>{product.numOfReviews} Reviews</span>
        </div>
    </Link>
    </div>
  )
}

export default Product;