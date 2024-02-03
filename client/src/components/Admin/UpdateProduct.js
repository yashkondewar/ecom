import React, {useRef, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {Mail, KeyRound, User} from "lucide-react";
import "./UpdateProduct.css"
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {error:updateError, loading, isUpdated} = useSelector(state => state.product);
    const {error, product} = useSelector(state => state.productDetails);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [user, setUser] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        Stock: "",
    })
    // const [isActive1, setisActive1] = useState(true);
    const [isActive2, setisActive2] = useState(true);


    useEffect(() => {
        console.log("hello");
        if(product && product._id !== id){
            console.log("hello");
            dispatch(getProductDetails(id))
        }
        else{
            setName(product.name)
            setDescription(product.description)
            setStock(product.Stock)
            setPrice(product.price)
            setCategory(product.category)
            setOldImages(product.images)
        }
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

        if(updateError){
            // console.log(error);
            const err = updateError;
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
            toast.success("Product Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/dashboard")
            dispatch({type: UPDATE_PRODUCT_RESET})
        }

    }, [dispatch, error, isUpdated, navigate, id, product, updateError])

    

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(updateProduct(id, myForm));
      };


    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };


  return (
    <>
        {loading? (<div className='loader'></div>):
        (
            <>
            <div className='containerX'>
                <div className='boxX' style={{background: "rgba(18, 18, 33, 0.785)"}}>
                

                        <form className='createProductForm' encType="multipart/form-data"
                            onSubmit={updateProductSubmitHandler}
                         >
                            <div className='signUpName'>
                                <User className='svg' />
                                <input
                                    type={'text'}
                                    placeholder="Name"
                                    required
                                    name = "name"
                                    value = {name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='signUpEmail'>
                                <Mail className='svg' />
                                <input
                                    type={'text'}
                                    placeholder="Description"
                                    required
                                    name = "description"
                                    value = {description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <KeyRound className='svg' />
                                <input
                                    type={'number'}
                                    placeholder="Price"
                                    required
                                    name = "price"
                                    value = {price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <KeyRound className='svg' />
                                <input
                                    type={'number'}
                                    placeholder="Stock"
                                    required
                                    name = "Stock"
                                    value = {Stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className='signUpPassword'>
                                <KeyRound className='svg' />
                                <select 
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="Other">Other</option>
                                    <option value="Nike">Nike</option>
                                    <option value="Adidas">Adidas</option>
                                    <option value="HRX">HRX</option>
                                    <option value="Campus">Campus</option>
                                    <option value="Puma">Puma</option>
                                    
                                </select>
                            </div>
                            <div id="registerImage">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                            </div>

                            <div id="createProductFormImage">
                            {oldImages  && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Product Preview" />
                            ))}
                            </div>

                            <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                            </div>

                            
                            <input type="submit" value="Update" className='signUpBtn'  />
                        </form>
                    
                </div>
            </div>
                
            </>
        )}
    </>
  )
}

export default UpdateProduct