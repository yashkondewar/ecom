import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProduct } from '../../actions/productActions.js';
// import Loader from "../Loader/Loader";
import Product from "../Home/Product";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Button,
    HStack,
    Heading,
    Slider,
    SliderTrack,
    SliderThumb,
    SliderFilledTrack,
    Tooltip,
    Box,
} from '@chakra-ui/react'

const Products = () => {
    const dispatch = useDispatch();
    const {products, loading, error,  resultPerPage, filteredProducts} = useSelector((state)=>state.products)
    const [currentPage, setCurrentPage] = useState(1);
    const [min, setPriceMin] = useState(0);
    const [max, setPriceMax] = useState(10000);
    const {keyword} = useParams(); 
    // console.log(keyword);

    // let tmpFilteredCount = Number(filteredProducts);
    // let prodOnAPage = Number(resultPerPage);
    // console.log(tmpFilteredCount);
    // console.log(resultPerPage);

    const [pages, setpages] = useState(1);
    const [category, setCategory] = useState("");
    const [ratings, setratings] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false);

    const categories = ["Other", "Nike", "Adidas", "HRX", "Puma", "Campus"];
    const nextPage = (e) => {
        setCurrentPage((currentPage+1));
    };
    const prevPage = (e) => {
        setCurrentPage((currentPage-1));
    };


    const range = (priceRange) =>{
        
        setPriceMin(priceRange[0]);
        // console.log(min);
        setPriceMax(priceRange[1]);
        // console.log(max);

    }

    useEffect(() => {
        if(error){
            const err = error;
            dispatch(clearErrors());
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
            // dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, min, max, category, ratings))

        setpages(currentPage*resultPerPage);
    }, [dispatch, error, keyword, currentPage, min, max, category, ratings])



  return (
    <>
        {loading ? (<div className='loader'></div>) : (
            <>
                <h2 className='productHeading'>Products</h2>
                <div className='containertt' >
                    {products  &&  products.map((item)=>
                        <Product key={item._id} product={item} />
                    )}
                </div>
               
                <HStack w={'full'} className={'page'}>
                    
                        <Button isDisabled={currentPage===1} onClick={prevPage}>Prev</Button>
                        <Button isDisabled={pages>=filteredProducts} onClick={nextPage}>Next</Button>
                    
                </HStack>
                
                <div className='filters'>
                <RangeSlider defaultValue={[min, max]} min={0} max={10000} step={500} onChangeEnd={range}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <RangeSliderTrack bg='red.100'>
                        <RangeSliderFilledTrack bg='tomato' />
                    </RangeSliderTrack>
                    <Tooltip
                        hasArrow
                        bg='teal.500'
                        color='white'
                        placement='top'
                        isOpen={showTooltip}
                        label={`${min}`}
                    >
                        <RangeSliderThumb boxSize={6} index={0} />
                    </Tooltip>
                    
                    <Tooltip
                        hasArrow
                        bg='teal.500'
                        color='white'
                        placement='top'
                        isOpen={showTooltip}
                        label={`${max}`}
                    >
                        <RangeSliderThumb boxSize={6} index={1} />
                    </Tooltip>
                </RangeSlider>


                <h3 style={{"fontSize": "1rem", "textDecoration": "underline"}}>Categories</h3>
                <ul className='categoryBox'>{
                    categories.map((category) => (
                        <li className='category-link' key={category} onClick={()=>setCategory(category)}>
                            {category}
                        </li>
                    ))
                }</ul>


                {/* <Box pt={6} pb={2}> */}
                <Slider defaultValue={ratings} min={0} max={5} step={1} onChangeEnd={(val)=>setratings(val)}
                    onMouseEnter={() => setShowTooltip2(true)}
                    onMouseLeave={() => setShowTooltip2(false)}
                >
                <SliderTrack bg='red.100'>
                    <Box position='relative' right={10} />
                    <SliderFilledTrack bg='tomato' />
                    <Tooltip
                        hasArrow
                        bg='teal.500'
                        color='white'
                        placement='top'
                        isOpen={showTooltip2}
                        label={`${ratings}*`}
                    >
                        <SliderThumb />
                    </Tooltip>
                </SliderTrack>
                <SliderThumb boxSize={6} />
                </Slider>
                {/* </Box> */}
                </div>
              
            </>
        )}
    </>
  )
}

export default Products